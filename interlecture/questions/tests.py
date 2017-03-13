from channels import Group
from channels.tests import ChannelTestCase, HttpClient
from django.contrib.auth.models import User
from questions.models import *

# Create your tests here.

class MockUser:
    def __init__(self,name):
        self.client=HttpClient()
        User.objects.create_user(username=name,
            email='test@example.com',password='top_secret')
        self.client.force_login(User.objects.get(username=name))
        self.client.send_and_consume('websocket.connect',path='/')

class QuestionsTests(ChannelTestCase):
    def setUp(self):
        self.alice=MockUser('alice')
        self.bob=MockUser('bob')
        self.room=Room.objects.create(name='test');self.room.save()
    
    def check_msg(self,msg,expected):
        self.assertEqual(msg['type'],'NEW_POSTS')
        self.assertGreaterEqual(len(msg['posts']),len(expected))
        for post,(user,text) in zip(msg['posts'],expected):
          self.assertIn('id',post)
          self.assertEqual(post['room'],self.room.name)
          if user: self.assertEqual(post['user'],user)
          else: self.assertNotIn('user',post)
          self.assertEqual(post['text'],text)
    
    def test_posts(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','room':'test'})
        self.assertEqual(self.alice.client.receive()['type'],'NEW_POSTS')
        
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'post','room':'test',
                'text':'Bob, are you here?'})
        self.check_msg(self.alice.client.receive(),[('alice','Bob, are you here?')])
        
        self.bob.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','room':'test'})
        post0=self.bob.client.receive()
        self.check_msg(post0,[('alice','Bob, are you here?')])
        post0_id=post0['posts'][0]['id']
        self.assertEqual(post0['posts'][0]['parent_post'],None)
        
        self.bob.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'post','room':'test',
                'text':'I am here.','parent_post':post0_id})
        post1=self.bob.client.receive()
        self.check_msg(post1,[('bob','I am here.')])
        self.check_msg(self.alice.client.receive(),[('bob','I am here.')])
        self.assertEqual(post1['posts'][0]['parent_post'],post0_id)
    
    def test_no_such_room(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','room':'nosuchroom','request_id':'foo'})
        self.assertEqual(self.alice.client.receive()['type'],'INVALID_REQUEST')
