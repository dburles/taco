//
AccountsTemplates.configure({

    defaultLayout: 'main',
    //defaultLayoutRegions: {
    //    nav: 'myNav',
    //    footer: 'myFooter'
    //},
    defaultContentRegion: 'content',


    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: false,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    //onLogoutHook: myLogoutFunc,
    //onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,

    // Texts
    texts: {
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },

        title: {
            signIn: "Snap CRM",

            forgotPwd: "Recover Your Password"


        },
        errors: {
            accountsCreationDisabled: "Client side accounts creation is disabled!!!",
            cannotRemoveService: "Cannot remove the only active service!",
            captchaVerification: "Captcha verification failed!",
            loginForbidden: "Login Failed",
            mustBeLoggedIn: "Please login to continue",
            pwdMismatch: "Passwords don't match",
            validationErrors: "Validation Errors",
            verifyEmailFirst: "Please verify your email first. Check the email and follow the link!"
        }
    }
});


AccountsTemplates.configureRoute('signIn', {
    name: 'signIn',
    path: '/signin',
    template: 'signIn',
    redirect: '/'
});

//FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn], {
    except: [ 'signIn', 'signUp', 'forgotPwd', 'signin',
        'resetPwd', 'verifyEmail', 'resendVerificationEmail',
        'checklist'
    ]
});

