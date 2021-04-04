# Bloom Filter Spell Checker

## About
This spell checker uses a basic JavaScript implementation of a Bloom Filter to probabilistically check spelling against a dictionary of 338,883 words. The spell checker has an a 0.001% probability of reporting a false positive (i.e. not catching a misspelled word).


## Installation

`npm install`


## Start server

`npm start`

Upon executing the command, a new browser tab will open. It may take 20-30 seconds for the page to load, as the browser will instantiate and initialize the Bloom Filter prior to rendering the UI.