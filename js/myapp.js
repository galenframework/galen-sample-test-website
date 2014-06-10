Notes = {
    notes: [
        {
            title: "Simple note",
            description: "asfafasf sf asf asa as"
        },{
            title: "Another note",
            description: "asfafasf sf asf asa aasdssad dasdsad sad sad sadas das d sd sasa ds adas asd adss"
        }
    ],
    getAll: function () {
        return this.notes;
    }
};

App = {
    templates: {
    },
    compileTemplate: function (id) {
        var source = $("#" + id).html();
        return Handlebars.compile(source);
    },
    initTemplates: function (pages) {
        for (name in pages) {
            if (pages.hasOwnProperty(name)) {
                this.templates[name] = this.compileTemplate(pages[name]);
            }
        }
    },
    init: function () {

        Handlebars.registerHelper('shortText', function(text) {
            text = Handlebars.Utils.escapeExpression(text);
            
            if (text.length > 50) {
                text = text.substring(0, 50) + "...";
            }
            return new Handlebars.SafeString(text);
        });


        this.initTemplates({
            welcomePage: "tpl-welcome-page",
            loginPage: "tpl-login-page",
            myNotesPage: "tpl-my-notes-page",
            addNotePage: "tpl-add-note-page"
        });
    },
    showLoginPage: function () {
        this.render(this.templates.loginPage());
    },
    showWelcomePage: function () {
        this.render(this.templates.welcomePage());
    },
    showMyNotesPage: function () {
        this.render(this.templates.myNotesPage({
            notes: Notes.getAll()
        }));
    },
    showAddNotePage: function () {
        this.render(this.templates.addNotePage());
    },
    render: function (html) {
        $("#content").html(html);
    },
    login: function () {
        var username = $("input[name='login.username']").val();
        var password = $("input[name='login.password']").val();

        if (username == "testuser@example.com" && password == "test123") {
            this.loggedUser = {
                name: "John",
                email: "testuser@example.com"
            };

            this.showMyNotesPage();
        }
        else {
            $("#login-error-message").html("The username or password are incorrect").show();
        }
    }
};
