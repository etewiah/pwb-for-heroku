# PropertyWebBuilder for heroku

This application is a fully featured Ruby on Rails website that is ready to be deployed to heroku.
It is a demonstration of how the [PropertyWebBuilder](https://github.com/etewiah/property-web-builder) Rails engine can be used in an application.


## Deploying to Heroku

First of all [sign up for Heroku](https://signup.heroku.com/identity) if you don't already have an account, and install the [Heroku Toolbelt](https://toolbelt.heroku.com/).

Next, clone this repository:

```
git clone https://github.com/etewiah/pwb-for-heroku.git
```

CD into the directory for the project and run the ff:


```
heroku create
heroku addons:create heroku-postgresql
git push heroku master
heroku run rake db:migrate
heroku run rake pwb:db:seed
heroku open
```



## Documentation

For more about the PropertyWebBuilder gem see:

[PropertyWebBuilder](https://etewiah.github.io/property-web-builder/)

For more information about using Ruby on Heroku, see these Dev Center articles:

- [Ruby on Heroku](https://devcenter.heroku.com/categories/ruby)
- [Getting Started with Ruby on Heroku](https://devcenter.heroku.com/articles/getting-started-with-ruby)
- [Heroku Ruby Support](https://devcenter.heroku.com/articles/ruby-support)
