Introduction
============

This directory contains a – later modified – copy of the Reality
Builder widget written in Python for Google App Engine. On March 20
2017 CET, the source code of the currently deployed version was
obtained from:

<https://console.cloud.google.com/debug
?repo=appengine:%3Fservice%3Ddefault%26version%3D1-9-0&fp=%2Frealitybuilder.js
&dlv=3&project=realitybuilder-hrd&app=GAE:default@1-9-0>

Felix E. Klee <felix.klee@inka.de>


Initialization
==============

It is now possible for the app to initialize itself. The presence of
the environment variable `NEEDS_INITIALIZATION` causes `scene/init.py`
to be loaded.
