# Application using Expressjs

This application uses several packages in order to manage users.

## Install the Application

After cloning the application, run this command in the root folder, in order to install the packages.

    npm install

Further explanations here:

Replace `[my-app-name]` with the desired directory name for your new application. You'll want to:

* Point your virtual host document root to your new application's `public/` directory.
* Ensure `logs/` is web writeable.

To run the application in development, you can run these commands 

	cd [my-app-name]
	php composer.phar start

Run this command in the application directory to run the test suite

	php composer.phar test

That's it! Now go build something cool.
