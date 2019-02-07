RESTFUL ROUTES

name    url             verb    description
=================================================
INDEX   /dogs           GET     Display a list of all dog
NEW     /dogs/new       GET     Display form to make a new dog
CREATE  /dogs           POST    Add new dog to DB
SHOW    /dogs/:id       GET     show info about one dog
Edit    /dogs/:id/edit  GET     show edit form for one dog
Update  /dogs/:id       PUT     update a particular dog, then redirect somewhere
Destroy /dogs/:id       DELETE  delete a particular dog, then redirect somewhere
