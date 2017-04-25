from django.test import TestCase
from interauth.forms import UserForm
from interauth.views import init_activation, activate
from interauth.models import UserActivation
from django.contrib.auth.models import User


class BadUserRegistrationTestCase(TestCase):
    def setUp(self):
        self.user_form = UserForm(
            {'username': '',
             'first_name': '',
             'last_name': '',
             'email': '',
             'password': '',
             'confirm_password': ''}
        )
    
    def testReject(self):
        self.assertNotEqual(self.user_form.d2r_friendly_errors(),'')
        self.assertFalse(self.user_form.is_valid())
        
class BadUserRegistrationTestCase2(TestCase):
    def setUp(self):
        User.objects.create_user(
            username='alice',
            first_name='Alice',
            last_name='Seleznyova',
            email='as@ntnu.edu',
            password='drowssap',
            is_active=False
        )
        self.user_form = UserForm(
            {'username': 'alice',
             'first_name': 'Alice',
             'last_name': 'Seleznyova',
             'email': 'as@ntnu.edu',
             'password': 'drowssap',
             'confirm_password': 'drowssap'}
        )
    
    def testReject(self):
        self.assertNotEqual(self.user_form.d2r_friendly_errors(),'')
        self.assertFalse(self.user_form.is_valid())

class BadUserRegistrationTestCase5(TestCase):
    def setUp(self):
        User.objects.create_user(
            username='alice',
            first_name='Alice',
            last_name='Seleznyova',
            email='as@ntnu.edu',
            password='drowssap',
            is_active=False
        )
        self.user_form = UserForm(
            {'username': 'alice',
             'first_name': 'Alice',
             'last_name': 'Seleznyova',
             'email': 'as@ntnu.no',
             'password': 'drowssap',
             'confirm_password': 'drowssap'}
        )
    
    def testReject(self):
        self.assertNotEqual(self.user_form.d2r_friendly_errors(),'')
        self.assertFalse(self.user_form.is_valid())
        
class BadUserRegistrationTestCase3(TestCase):
    def setUp(self):
        self.user_form = UserForm(
            {'username': 'dsa',
             'first_name': 'asd',
             'last_name': 'sad',
             'email': 'x@gmail.com',
             'password': 'dsa',
             'confirm_password': 'dsb'}
        )
    
    def testReject(self):
        self.assertNotEqual(self.user_form.d2r_friendly_errors(),'')
        self.assertFalse(self.user_form.is_valid())
        
class BadUserRegistrationTestCase4(TestCase):
    def setUp(self):
        self.user_form = UserForm(
            {'username': 'dsa',
             'first_name': 'asd',
             'last_name': 'sad',
             'email': 'x@gmail.com',
             'password': 'dsa',
             'confirm_password': 'dsa'}
        )
    
    def testReject(self):
        self.assertNotEqual(self.user_form.d2r_friendly_errors(),'')
        self.assertFalse(self.user_form.is_valid())
        
class UserRegistrationTestCase(TestCase):
    def setUp(self):
        self.user_form = UserForm(
            {'username': 'testcase',
             'first_name': 'Firstname',
             'last_name': 'Lastnamesonson the Third',
             'email': 'test@ntnu.edu',
             'password': 'drowssap',
             'confirm_password': 'drowssap'}
        )

    def _test_form_is_valid(self):
        self.assertTrue(self.user_form.is_valid())

    def _test_form_can_create_user(self):
        User.objects.create_user(
            username=self.user_form.cleaned_data['username'],
            first_name=self.user_form.cleaned_data['first_name'],
            last_name=self.user_form.cleaned_data['last_name'],
            email=self.user_form.cleaned_data['email'],
            password=self.user_form.cleaned_data['password'],
            is_active=False
        )
        self.assertEqual(User.objects.count(), 1)

    def _test_user_not_yet_activated(self):
        user = User.objects.get(username='testcase')
        self.assertFalse(user.is_active)

    def _test_activation_function_creates_activation_object(self):
        user = User.objects.get(username='testcase')
        init_activation(user)
        self.assertEqual(UserActivation.objects.count(), 1)

    def _test_activation_works(self):
        user = User.objects.get(username='testcase')
        user_activation = UserActivation.objects.get(user=user)
        activate(None, user_activation.activation_key)
        user = User.objects.get(username='testcase')
        self.assertTrue(user.is_active)

    def test_activation(self):
        self._test_form_is_valid()
        self.user_form.safe_data()
        self._test_form_can_create_user()
        self._test_user_not_yet_activated()
        self._test_activation_function_creates_activation_object()
        self._test_activation_works()
