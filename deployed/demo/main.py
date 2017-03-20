# -*- coding: utf-8 -*-

# Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License. You may obtain a copy of
# the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations under
# the License.

import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

from google.appengine.dist import use_library
use_library('django', '0.96')

import logging
import os
import time
import sys
import exceptions
import google.appengine.ext.db
from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

reality_builder_version = os.environ['CURRENT_VERSION_ID'].split('.')[0]

class Index(webapp.RequestHandler):
    def get(self):
        template_values = {
            'reality_builder_version': reality_builder_version}
        
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_values))

class Admin(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user and users.is_current_user_admin():
            template_values = {
                'reality_builder_version': reality_builder_version,
                'logout_url': users.create_logout_url("/demo/admin")}

            path = os.path.join(os.path.dirname(__file__), 'admin.html')
            self.response.out.write(template.render(path, template_values))
        else:
            self.redirect(users.create_login_url("/demo/admin"))
            return

application = webapp.WSGIApplication([
        ('/demo', Index), ('/demo/admin', Admin)])

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
