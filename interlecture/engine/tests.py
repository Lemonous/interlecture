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
        
    def test_errors(self):
        self.alice.client.send_and_consume('websocket.receive',
            text={'app':'you','command':'screw','request_id':'foo'})
        self.assertEqual(self.alice.client.receive()['type'],'INVALID_REQUEST')
