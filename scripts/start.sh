#!/bin/bash

yarn db:generate
yarn db:migrate
yarn dev
