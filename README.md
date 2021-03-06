# Apprentice Bingo Web App

Live at [http://samsondanziger.com/projects/apprentice-bingo/live][live-site]

![apprentice bingo image][bingo-image]

This a  project I forked in order to have a go at a client side web app. It was my first foray into [AngularJS][angular].

Apprentice Bingo was originally designed by [Murray Colpman][muzer], [Tom Leese][tleese], and [Alice Hawke][alihawke]. The game is played whilst watching a series of [The Apprentice][the-apprentice]. When the candidates say any of the clichés, you can cross it off your bingo square, and hopefully win before anyone else.

There are 2 types of Apprentice episodes, either the usual tasks or the interview style, usually with the final 5 candidates. Allowing for this, there are options to select the bingo square to create, from within the app.

The recommended options are 2 squares, each of 3x3 tiles.

### Configuration

All configuration can be done through the `app/data.json` file. The layout of the file makes it quite clear as to what is expected, however the skeleton file is below.

```json
{
    "candidates":   [],
    "interviews":   [],
    "tasks":        []
}
```

[live-site]: http://samsondanziger.com/projects/apprentice-bingo/live
[bingo-image]: https://gyazo.com/4251414b6f7b7cff2e7b66f1d0429b89.png
[angular]: https://angularjs.org/
[muzer]: https://github.com/muzer
[tleese]: https://github.com/thomasleese
[alihawke]: https://github.com/alihawke
[the-apprentice]: http://www.bbc.co.uk/programmes/b0071b63
