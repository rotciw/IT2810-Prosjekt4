# project_4

## Applikasjonens innhold og funksjonalitet

## Teknologi

### React Native

Prosjektet baserer seg på React Native, som har mange likhetstrekk med React. 
Av den grunn har vi valgt å gjenbruke noe av oppsettet og logikken fra prosjekt 3. 
Både komponentstrukturen og flere av funksjonene i prosjektet er relativt lik. Vi har koblet appen opp mot serveren vi satt opp i prosjekt 3 på tilsvarende måte med Apollo.
React Native støtter ikke HTML- eller CSS-syntax. Derfor har vi  benyttet React Native komponenter (feks. <View> fremfor <div>), og style sheets.
Brukergrensesnittet er endret slik at det er i samsvar med vanlige konvensjoner for mobile applikasjoner.
Vi har i hovedsak benyttet tredjepartskomponenter fra `react-native` og `react-native-elements` for Text, View, ScrollView, FlatList, Modal osv. 
Videre har vi benyttet en range slider fra `@ptomasroos/react-native-multi-slider` for filtrering på årgang og pris. 

Vi har forsøkt å gjøre koden så mudulær som mulig slik at kompoentene våre enkelt kan gjenbrukes. 
Samtidig fører dette til en oversiktlig kodebase som enkelt kan vidreutvikles av andre.
Koden er skrevet i ES6, med ESLint som linter.

### Expo

I henhold til kravspesifikasjonen har vi benyttet verktøyet Expo i dette prosjektet. 
Dette har gjort utviklingsprosessen enkel og effektiv. 
Verktøyet muliggjør bl.a. for fortløpende dynamsik testing på mobile enheter.
Prosjektet er initialisert med `expo init my-new-project`, og kan kjøres med `npm start`. 
Deretter kan en scanne QR-koden som kommer opp i terminalen for å åpne appen på iOS eller Android.
Vi valgte å benytte malen "tabs" fra Expo slik at vi fikk en grunnmur å jobbe ut ifra. 
Denne inneholder bl.a. navigering ved hjelp av faner nederst på skjermen, samt. et forslag til filstruktur. 

### AsyncStorage

For å lagring mellom hver gang man kjører appen har vi brukt AsyncStorage. 
Vi har valgt å lagre favoritter slik at man slipper å huske på å søke opp produkter man liker flere ganger. 
På favorittsiden kan man se alle favoritter man har lagret og få mer informasjon om produktet ved å trykke på det slik som i søkelisten. 
Ønsker man å fjerne et produkt fra listen har vi lagt til en knapp for å fjerne favoritter som kommer frem om man drar produktet til siden. 
Dette er en funksjon for den mer avanserte brukeren og om man ikke er så datakjent kan man fjerne den ved å gå inn på produktet og trykke på liker hjerteknappen igjen for å fjerne produktet.

I AsyncStorage lagrer vi all dataen om et produkt slik at man kan få opp all informasjon når man ser den detaljerte visningen til hvert produkt.

Favoritter lagres via den detaljerte visningen og man ser forskjell på knappen om man har lagret det eller ikke og kan ved å trykke på knappen igjen endre om prudktet skal være en favoritt.

## Git, koding

## Testing

Siden det ikke var krav til automatisk testing av koden har vi valgt å gjøre end to end test manuelt. Testing har fåregått på følgende enheter:
- OnePlus 6 (1080 x 2280)
- Samsung Galaxy 10e (1080 x 2280)
- iPhone 6S Plus (750 x 1334)






