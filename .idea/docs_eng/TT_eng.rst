==============================
Technical task for the project
==============================

*The project is: a blog about finance and investments, in which you can create an article, account, comment. Subscribe to the newsletter, calculate your portfolio, read the latest news. Read the writer's profile, see the latest awards for posts, comments, a certain period of use by the application (site). It is also possible to ban the user for a certain period (or forever). You can monitor the user's activity, see what he viewed, what he liked, where he spent more time. Collecting these statistics to display similar topics in the recommendations feed*

------------------------
1. Project functionality
------------------------

*The project may change some individual functions, but the basic concept should be preserved*

* Creation of articles (Title, text, picture, date of creation/update, publication yes/no)
* Creating article categories
* Account Creation (Authorization, Registration, Logout, Password Reset, Deletion)
* Creating comments (Text, Article, Date of creation, Author's nickname, picture optional)
* Newsletter Subscription (Subscription and Opt-out option)
* User profile (Nickname, name, email, password, photo, recent posts, likes, comments, about yourself, hobbies, place of work)
* User control (The ability to ban for a certain period (or forever))
* Monitoring user activity (Number of times spent on the site (application), articles shared, collection of interests)
* Recommendation feed (I summarize all the data about the user to create a recommendation feed based on 70% - articles of interest to him, 30% - random (or closely similar) posts)

--------
2. Tests
--------
* Make tests of page status codes
* To make tests for the Database: {
	1. Data entry,
	2. Creating an account,
	3. Log in to your account,
	4. Log out of your account,
	5. Проверка написания статьи, для всех (обучение, мотивация, рекомендации)
}
* Checking links to pages

-----------
3. Coverage
-----------

coverage run --source='.' manage.py test  Code coverage check (needed after each change)
coverage html                             To create a report

------------
4. Data Base
------------
*It is necessary to decide which types of requests will be sent to the database and whether it is worth saving data to an additional database. As a way to conjugate data*

------
5. API
------
*You need to create an api for transferring data to frontend, but it is also important to decide whether to use REST or SDK*

-------------
6. Admin page
-------------
*You need to make a dashboard to monitor the activity and operation of the system, and also add an api. You need to see how the statistics of article views are created and based on this issue of the article, one or another category*

---------
7. Server
---------
*You need to write a server on nginx, choose a place for cloud storage, and choose a hosting for the site*
