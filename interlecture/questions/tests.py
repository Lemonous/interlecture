from channels import Group
from channels.tests import ChannelTestCase, HttpClient
from django.contrib.auth.models import User
from questions.models import *


class MockUser:
    def __init__(self,name):
        self.client=HttpClient()
        self.user=User.objects.create_user(username=name,
            email='test@example.com',password='top_secret')
        self.user.save()
        self.client.force_login(self.user)
        self.client.send_and_consume('websocket.connect',path='/')

class DeleteTest(ChannelTestCase):
    def setUp(self):
        self.alice=MockUser('alice')
        
        self.room=Room.objects.create(name='test',lecturer=self.alice.user);self.room.save()
        self.p0=Post.objects.create(
            room=self.room,user=self.alice.user,text="BEEP")
        self.p0.save()
        self.p1=Post.objects.create(
            room=self.room,user=self.alice.user,text="BOOP",parent_post=self.p0)
        self.p1.save()


    def test_delete(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','room':'test'})
        self.alice.client.receive()
        
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'delete','room':'test','post':self.p0.id})
        cmd=self.alice.client.receive()
        
        self.assertEqual(cmd['type'],'DELETE_POST')
        self.assertEqual(cmd['post'],self.p0.id)
        
        with self.assertRaises(Post.DoesNotExist):
            Post.objects.get(id=self.p0.id)
            Post.objects.get(id=self.p1.id)


class PostTest(ChannelTestCase):
    def setUp(self):
        self.alice=MockUser('alice')
        
        self.room=Room.objects.create(name='test',lecturer=self.alice.user);self.room.save()
        self.p0=Post.objects.create(
            room=self.room,user=self.alice.user,text="Bob, are you here?")
        self.p0.save()
    
    
    def test_subscribe_old(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','room':'test'})
        posts=self.alice.client.receive()
        
        self.assertEqual(posts['type'],'NEW_POSTS')
        self.assertIn('data',posts)
        
        self.assertEqual(len(posts['data']),1)
        self.assertEqual(posts['data'][0],self.p0.get())
    
    
    def test_subscribe_and_post_and_delete(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','room':'test'})
        self.alice.client.receive()
        
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'post','room':'test','text':'I am waiting for you.'})
        posts=self.alice.client.receive()
        
        self.assertEqual(posts['type'],'NEW_POSTS')
        
        self.assertEqual(len(posts['data']),1)
        post=Post.objects.get(text='I am waiting for you.').get()
        self.assertEqual(posts['data'][0],post)
            
    
    def test_support(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'support','post':self.p0.id})
        self.alice.client.receive()
        
        self.assertIn(self.alice.user,self.p0.supporters.all())
        self.assertIn('supporters',self.p0.get())
        self.assertEqual(self.p0.get()['supporters'],1)
        
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'support','post':self.p0.id})
        self.alice.client.receive()
        
        self.assertEqual(self.p0.get()['supporters'],1)
    
    
    def test_object_not_found(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','room':'nosuchroom','request_id':'foo'})
        reply=self.alice.client.receive()
        
        self.assertEqual(reply['type'],'INVALID_REQUEST')
