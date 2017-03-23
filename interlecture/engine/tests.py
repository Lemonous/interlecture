from channels import Channel
from channels.tests import ChannelTestCase, Client, HttpClient
from django.contrib.auth.models import User
from engine.consumers import ws_add
from types import SimpleNamespace

# Create your tests here.

class EngineTest(ChannelTestCase):
    def setUp(self):
       self.alice=SimpleNamespace()
       self.alice.client=HttpClient()
       self.alice.user=User.objects.create_user(username='alice',
            email='test@example.com',password='top_secret')
       self.alice.client.force_login(self.alice.user)
       
       self.eve=SimpleNamespace()
       self.eve.client=HttpClient()
       
    def test_login(self):
        Channel('websocket.connect').send({'reply_channel':'foo','headers':self.alice.client.headers,'path':'/'})
        ws_add(self.get_next_message('websocket.connect'))
        self.assertTrue(self.get_next_message('foo').content['accept'])
        
        Channel('websocket.connect').send({'reply_channel':'bar','headers':self.eve.client.headers,'path':'/'})
        ws_add(self.get_next_message('websocket.connect'))
        self.assertFalse(self.get_next_message('bar').content['accept'])
    
    def test_test_request(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'test','command':'test','foo':'zip','request_id':'foo'})
        result=self.alice.client.receive()
        self.assertIn('type',result)
        self.assertEqual('TEST',result['type'])
        self.assertIn('bar',result)
        self.assertEqual('zip',result['bar'])
        
    def test_no_reply(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'test','command':'test','foo':'zip'})
        self.assertIsNone(self.alice.client.receive())
    
    def test_invalid_command(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'you','command':'screw','request_id':'foo'})
        self.assertEqual(self.alice.client.receive()['type'],'INVALID_REQUEST')
     
    def test_missing_argument(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'test','command':'test','request_id':'foo'})
        self.assertEqual(self.alice.client.receive()['type'],'INVALID_REQUEST')
