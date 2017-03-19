from django.contrib.auth.models import User
from django.forms import Form, EmailField, CharField, PasswordInput, ValidationError
from django.core.exceptions import ObjectDoesNotExist
import re
import json


class UserForm(Form):
    username = CharField(max_length=150)
    first_name = CharField(max_length=30)
    last_name = CharField(max_length=30)
    email = EmailField()
    password = CharField(max_length=128)
    confirm_password = CharField(max_length=128)

    def clean(self):
        cleaned_data = super(UserForm, self).clean()

        if not cleaned_data.get('password') == cleaned_data.get('confirm_password'):
            self.add_error(None, ValidationError('Passwords do not match', code='noPasswordMatch'))

        if not cleaned_data.get('email'):
            pass
        elif not (re.match(r'[@.]ntnu(.edu|.no)', cleaned_data.get('email')[-7:])):
            self.add_error(None, ValidationError('Not an NTNU email', code='notNtnuEmail'))

        try:
            User.objects.get(email=cleaned_data.get('email'))
            self.add_error(None, ValidationError('Email already in use', code='emailInUse'))
        except ObjectDoesNotExist:
            pass

        try:
            User.objects.get(username=cleaned_data.get('username'))
            self.add_error(None, ValidationError('Username already in use', code='usernameInUse'))
        except ObjectDoesNotExist:
            pass

        return cleaned_data

    def d2r_friendly_errors(self):
        error_string = '{'
        error_dict = json.loads(self.errors.as_json())
        print(error_dict)

        if error_dict.get('username'):
            if error_dict['username'][0]['code'] == 'required':
                error_string += 'noUsername:true,'

        if error_dict.get('first_name'):
            if error_dict['first_name'][0]['code'] == 'required':
                error_string += 'noFirstName:true,'

        if error_dict.get('last_name'):
            if error_dict['last_name'][0]['code'] == 'required':
                error_string += 'noLastName:true,'

        if error_dict.get('email'):
            if error_dict['email'][0]['code'] == 'required':
                error_string += 'noEmail:true,'

        if error_dict.get('password'):
            if error_dict['password'][0]['code'] == 'required':
                error_string += 'noPassword:true,'

        if error_dict.get('confirm_password'):
            if error_dict['confirm_password'][0]['code'] == 'required':
                error_string += 'noConfirmPassword:true,'

        if error_dict.get('__all__'):
            if error_dict['__all__'][0]['code'] == 'noPasswordMatch':
                error_string += 'noPasswordMatch:true,'

            if error_dict['__all__'][0]['code'] == 'notNtnuEmail':
                error_string += 'notNtnuEmail:true,'

            if error_dict['__all__'][0]['code'] == 'emailInUse':
                error_string += 'emailInUse:true,'

            if error_dict['__all__'][0]['code'] == 'usernameInUse':
                error_string += 'usernameInUse:true,'

        return error_string + '}'
