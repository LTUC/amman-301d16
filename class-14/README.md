# Database Normalization

## Overview

Today is the final buildout of the book collection app. Our final step is to normalize our database and remove duplicates while persisting the books we have already saved.

Also, the Code 301 final exam will become available today and is due at the end of lab time. This exam also serves as the Code 401 entrance exam. However, it is a pass/fail graded portion of this course, regardless of your intent to advance to a Code 401 course.

The exam is open book, open Google, open Stack Overflow, whatever resources you want to use, but it must be completed individually. You may not get help from anyone else, except from your instructor. The exam is designed to cover the full range of what was taught in this course. The intent is to measure not your memorization skills, but your resourcefulness and your ability to adapt and problem-solve. Give yourself adequate time for the exam.


## Daily Plan

- Warm-up exercise
- Review code challenges
- Code review of lab assignment
- Data modeling
- Code demo
- Lab preview
- Exam prep

## Learning Objectives

As a result of completing lecture 14 of Code 301, students will:

- Be able to perform a database migration in postgreSQL
- Update their schema to model data

## Notes
### Database errors and possible causes
 Cannot find relation "books"
 The database that i am looking in for the table "books" does not contain that table.

 Maybe the code is looking in the wrong database.
 Possibly DATABASE_URL could be incorrect or empty
 1. DATABASE_URL may not have been loaded from .env in local - forgot to require('dotenv') and call config - mispelled '.env' ' .env'
 2. DATABASE_URL may have been loaded from .env in production - We pushed .env and ran require('dotenv') and call config in heroku.
 3. DATABASE in DATABASE_URL doesn't exist

 Maybe the database does not contain a table called books
 1. We did not run the schema from the sql to create
 2. When we ran the schema from the sql to create, it had an error on the console and didn't create the table but we missed
 3. When we ran the schema from the sql to create, but we misspelled the table name.
 4. When we queried the database but we misspelled the table name.