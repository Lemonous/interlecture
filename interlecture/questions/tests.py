from channels import Group
from channels.tests import ChannelTestCase, HttpClient
from django.contrib.auth.models import User
from questions.models import Classroom,Question

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
        self.classroom=Classroom.objects.create(name='test');self.classroom.save()
    
    def check_msg(self,msg,expected):
        self.assertEqual(msg['type'],'ADD_QUESTIONS')
        self.assertGreaterEqual(len(msg['data']),len(expected))
        for i in range(-len(expected),0):
          user,text=expected[i]
          self.assertEqual(msg['data'][i]['classroom'],self.classroom.name)
          self.assertEqual(msg['data'][i]['user'],user)
          self.assertEqual(msg['data'][i]['text'],text)
    
    def test_questions(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','classroom':'test'})
        self.assertEqual(self.alice.client.receive()['type'],'ADD_QUESTIONS')
        
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'post_question','classroom':'test',
                'message_text':'Bob, are you here?'})
        self.check_msg(self.alice.client.receive(),[('alice','Bob, are you here?')])
        
        self.bob.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','classroom':'test'})
        self.check_msg(self.bob.client.receive(),[('alice','Bob, are you here?')])
        
        self.bob.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'post_question','classroom':'test',
                'message_text':'I am here.'})
        self.check_msg(self.bob.client.receive(),[('bob','I am here.')])
        self.check_msg(self.alice.client.receive(),[('bob','I am here.')])
    
    def test_no_such_classroom(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'questions','command':'subscribe','classroom':'nosuchclassroom','request_id':'foo'})
        self.assertEqual(self.alice.client.receive()['type'],'INVALID_REQUEST')
