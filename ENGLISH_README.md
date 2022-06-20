![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Indivual Project - Henry Pokemon

<img height='150' src='./pokemon.png'>

## Project's Goals

- Build an App using React, Redux, Node and Sequelize.
- Improve and connect concepts learned on the bootcamp.
- Learn the best practices.
- Use and practice testing.

## Dates and times

The project will last up to three weeks. In case of finishing all homeworks before that time, you may inform your Instructor in order to coordinate a DEMO meeting.

## Starting

1. Fork the repository to have a copy on your github account.
2. Clone the respository on your computers to start working.

You'll have a `boilerplate` with the server and client general structure.

__IMPORTANT:__ Is mandatory to have at least the last NODE and NPM stable version.

Currently those are:
-__Node__: 12.18.3 or mayor
-__NPM__: 6.14.16 or mayor

To verify the installed version:

```bash
node -v
npm -v
```

__Clarification__: The current dependencies are the same versions that we've been working on the bootcamp.

Versions:

-__react__: 17.0.1
-__react-dom__: 17.0.1
-__react-router-dom__: 5.2.0
-__redux__: 4.0.5
-__react-redux__: 7.2.3

It's allowed, under your responsability, to update those dependencies to later versions.

> __IMPORTANT:__ Later versions could have another settings that the ones we've been working on the bootcamp.

## BoilerPlate

It's have two folders: `api` and `client`. Inside of them it'll be the back-end and front-end code respectively.

On `api` you must create a file named: `.env` with the following content:

```env
DB_USER=postgresUser
DB_PASWORD=postgresPassword
DB_HOST=localhost
```
You must replace both `postgresUser` and `postgresPassword` in order to connect to postgres. This file will be ignored by git on the github upload, because contains sensitive data (your credentials).

In addition it will necessary that you create a database named `pokemon` on psql.

The `client` content was created using: 
```
npx create-react-app
```

## Statement

The overall idea is create an  application on which it can be visualized each Pokemon using the external api [pokeapi](hhtps://pokeapi.co/) and on top of that, other things like:

- Search for pokemons
- Filter them / Sort them
- Create new pokemons

__IMPORTANT__: For the filter and sort functionalities the api's endpoints that already return sorted or filtered results can not be used, becuase you must create  your own. In particularly one of them sorting or filtering must be done entirely on the front-end.

### The only Endpoints/Flags allowed to use:

- GET <https://pokeeapi.co/api/v2/pokemon>
- GET <https://pokeapi.co/api/v2/pokemon/{id}>
- GET <https://pokeapi.co/api/v2/pokemon/{name}>
- GET <https://pokeapi.co/api/v2/type>

### Minimum requirements
Next minimun requiriments to pass the individual project will be detailed. Those who want to add functionalities can do so. 
About visual design there will not be predefined wireframes nor prototypes, you'll be free to do as you wish, but you have to apply the knowledge you saw on the course to make it pleasent to the eye.

__IMPORTANT__: It isn't allowed the use of external libraries to apply styles to the application. You'll have to use CSS on some of the ways we saw them on class (pure CSS, CSS Modules or Styled Components).

#### Necessary technologies

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Frontend

It must be developed an React/Redux application that contains the following screens/routes.

__Landing Page__: You must build a landing page with:
- [ ] Some background image representative of the project theme.
- [ ] A button to go into the home page (`main route`)

__Main Route__: It must contain:

- [ ] Search input to find pokemons by name(The search must be precise, it must only retrieve it if the entered name is complete.)
- [ ] An area where the listed pokemons will be. At the beginning it must charge the first results obtained from the `GET /pokemons` route and it must show its:
    - Image
    - Name
    - Types (Electric, Fire, Water and so on)
- [ ] Buttons/Options to either sort by ascending or descending order the pokemons, to sort them by alphabetical order and to sort them by attack.
- [ ] Pagination to search and show the next pokemons, 12 pokemons by page.

__IMPORTANT__: Inside the maini route it must be shown both the pokemons originated on the API and those originated on the database. Secondly, if you study the endpoint that returns all the pokemons you'll see that it doesn't show its information but and URL to do another request a subresquest to obtain the data from there. You'll have to make a subrequest per pokemon to obtain its image and types. Because this can make the search to slow, you can limit the total result to 40 pokemon.

__Pokemon's details route__: It must contain:
- [ ] The fields shown on the main route for each pokemon (image, name and types).
- [ ] Pokemon's number (id)
- [ ] Statistics (Life, attack, defense, velocitiy)
- [ ] Heigth and weigth.

__Creation route__: It must cotain:

- [ ] A __JavaScript controlled__ form with the mentioned fields on the Pokemon details.
- [ ] The option to select/add more than one pokemon type.
- [ ] Button/Option to create a new Pokemon.

> It is a requirement that the creation form is validated with JavaScript and not only with HTML validations. You can add the validations you want. By example: The Pokemon's name can't contain numeric characters, the heigth can't be major that certain value, and so on.

## Database
The database model must have the followings entities (Those properties mark with asterisk must be mandatory):

- [ ] Pokemon with the following properties:
    - ID (Pokemon number) * : It can not be an ID from an existing pokeapi pokemon.
    - Name *
    - Attack
    - Defense 
    - Speed
    - Heigth
    - Weigth

 - [ ] Type with the followings properties:
    - ID
    - Name

The relationship between them must be many-to-many because one pokemon may belong to more than one type and a type may include many pokemons.

__IMPORTANT__: It's not allowed to use the filters, sorts and paginations offered by the external API, all of the functionalities must be developed by you.

- [ ] __GET /pokemons__:
    - Retrieve a pokemons list from pokeapi.
    - Return only the necessary data for the main page.
- [ ] __GET /pokemons/{idPokemon}__:
    - Obtain detailed pokemon on particular.
    - It must retrieve only the data ask by the Pokemon's deatails route.
    - Consider that it must work with an external api originated id and the database originated id.
- [ ] __GET /pokemons?name="..."__:
    - Obtain the pokemon whose name match the name brought by the query parameter (It can be from pokeapi or created by us.)
- [ ] __Get /types__:
    - 
