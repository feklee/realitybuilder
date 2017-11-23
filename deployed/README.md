Introduction
============

This directory contains a copy of the Reality Builder widget written in Python
for Google App Engine. On March 20 2017 CET, the source code of the currently
deployed version was obtained from:

<https://console.cloud.google.com/debug
?repo=appengine:%3Fservice%3Ddefault%26version%3D1-9-0&fp=%2Frealitybuilder.js
&dlv=3&project=realitybuilder-hrd&app=GAE:default@1-9-0>

The intention was to make it workable on the soon mandatory Python 2.7 runtime.

Successfully tested on November 23 2017 CNST with the following configuration:

  * Google App Engine SDK 1.9.10 on Windows 7 x64
  
  * Executed from `..` as:
  
        dev_appserver.py deployed
        
  * Initialized using the script `init.py` in the directory `scene`.
  
  * Containing realitybuilder.com web site:
  
      - Local URL: http://localhost:3000/

      - Commit: [d61448141da0aab0347976912e4937d3e1bb2855][1]

      - Executed with Node.js v8.9.1:

Felix E. Klee <felix.klee@inka.de>

[1]: https://github.com/feklee/realitybuilder.com/commit/d61448141da0aab0347976912e4937d3e1bb2855
