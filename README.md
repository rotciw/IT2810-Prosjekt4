# IT2810 - prosjekt 4

### Applikasjonens innhold og funksjonalitet



### Teknologi

##### React Native

Prosjektet baserer seg på React Native, som har mange likhetstrekk med React. 
Av den grunn har vi valgt å gjenbruke noe av oppsettet og logikken fra prosjekt 3. 
Både komponentstrukturen og flere av funksjonene i prosjektet er relativt lik. Vi har koblet appen opp mot serveren og databasen vi satt opp i prosjekt 3 på tilsvarende måte med Apollo. React Native støtter ikke HTML- eller CSS-syntax. Derfor har vi  benyttet React Native komponenter (feks. View fremfor div), og style sheets. Brukergrensesnittet er endret slik at det er i samsvar med vanlige konvensjoner for mobile applikasjoner. Vi har i hovedsak benyttet tredjepartskomponenter fra `react-native` og `react-native-elements` for Text, View, ScrollView, FlatList, Modal osv. Videre har vi benyttet en range slider fra `@ptomasroos/react-native-multi-slider` for filtrering på årgang og pris. 

Vi har forsøkt å gjøre koden så mudulær som mulig slik at kompoentene våre enkelt kan gjenbrukes. Samtidig fører dette til en oversiktlig kodebase som enkelt kan vidreutvikles av andre. Koden er skrevet i ES6, med ESLint som linter.

<img src="https://imgur.com/mTxXdf7.png" width="600px" alt="MobX Store"/>


##### Expo

I henhold til kravspesifikasjonen har vi benyttet verktøyet Expo i dette prosjektet. Dette har gjort utviklingsprosessen enkel og effektiv. Verktøyet muliggjør bl.a. for fortløpende dynamsik testing på mobile enheter. Prosjektet er initialisert med `expo init my-new-project`, og kan kjøres med `npm start`. Deretter kan en scanne QR-koden som kommer opp i terminalen for å åpne appen på iOS eller Android. Vi valgte å benytte malen "tabs" fra Expo slik at vi fikk en grunnmur å jobbe ut ifra. Denne inneholder bl.a. navigering ved hjelp av faner nederst på skjermen, samt. et forslag til filstruktur. 

##### ApolloClient

ApolloClient tar imot GraphQL spørringene og sender de til serveren, og fetcher dataen i UIet.

<img src="https://imgur.com/cA1mFNI.png" width="400px" alt="MobX Store"/>


##### AsyncStorage

For å lagring mellom hver gang man kjører appen har vi brukt AsyncStorage. 
Vi har valgt å lagre favoritter slik at man slipper å huske på å søke opp produkter man liker flere ganger. 
På favorittsiden kan man se alle favoritter man har lagret og få direkte link til vinmonopol siden til produktet. 
Vi valgte å gjøre dette fremfor å ha en visning som i søkekatalogen fordi brukeren allerede har lagret produktet og derfor har sett inforamsjon tidligere.
Dette gjør at brukeren har en kortere vei til å se om produktet finnes i en butikk eller bestille hjem,
men medfører dessverre at brukeren må søke opp produktet for å fjerne det fra favoritter. 

Favoritter lagres via den detaljerte visningen og man ser forskjell på knappen om man har lagret det eller ikke og kan ved å trykke på knappen igjen endre tilstand.

##### MobX og state management


Gruppen valgte å bruke MobX for state management for prosjektet. MobX ble hovedsakelig valgt på grunn av størrelsen til prosjektet, da Redux ofte er valget for store prosjekter. Siden gruppen ikke hadde noen erfaring med noen av disse rammeverkene, var MobX også anbefalt som et startpunkt.

Det er tre instanser til unntak for bruk av MobX for state management. I `FilterGroup`, `ModalContainer`, og `SearchBar` komponentene, blir React sitt innebygde state management brukt. Disse brukes for å holde intern state på komponenten i form av feks.å vise live oppdatering på hva som skrives inn i søkefeltet.

###### Eksempel på bruk av MobX:

MobX bruker konseptet av at det er stores som holder styr på states. Deretter brukes det en Provider komponent som wrappes rundt komponenter som trenger tilgang til store.

Provider komponenten “injecter” stores som brukes inn i komponentene.
```
const rootStore = new RootStore();
<Provider
    rootStore={rootStore}
    filterStore={rootStore.filterStore}
    sortStore={rootStore.sortStore}
    searchBarStore={rootStore.searchBarStore}
    paginationStore={rootStore.paginationStore}
>
    ...

</Provider>
```
Deretter er komponenter som bruker disse injected med stores de bruker, samtidig kan man gi komponenten observer status. Eks. Table komponenten
```
export default inject('sortStore', 'filterStore', 'searchBarStore', 'paginationStore')(observer(Table));
```
For stores blir innholdet også "decorated", der man definerer hva slags type variablene eller funksjonene er, som feks observable eller actions. Her er et eksempel i SearchBarStore:
```
decorate(SearchBarStore, {
    searchBarValue: observable,
    addSearchBarValue: action,
});
```
Under er et eksempel på sammenhengen av MobX og Pagination komponenten.

Ved å kjøre en “action” på Pagination, kjøres f eks en funksjon i paginationStore som kan oppdatere en variabel (state) i samme store. Denne kan da Table som også er en “observer”, ta imot og vise.

<img src="https://imgur.com/0D9qGCe.png" width="600px" alt="MobX Store"/>

Eksempel med kun Pagination. Andre stores og komponenter vises ikke i figuren.

#### Git, koding

Gruppen har aktivt benyttet kommentering av kode som et verktøy. Dette resulterer i en lesbar kode som er enkel å sette seg inn i for utenfortående. Vi har forsøkt å benytte beskrivende navn på variabler, funksjoner og komponenter. Prosjektet har en filstruktur som følger vanlige konvensjoner, og komponentene er delt opp i mindre deler fremfor store, komplekse komponenter.

Gruppen har benyttet seg av GitLab sin “boards”-funksjon for issues, da gruppen var vant med dette fra foregående prosjekter. Issues er delt inn i “Open”, “To-Do”, “Doing”, og “Closed”. Alle issues får en automatisk generert ID. Denne ID’en bruker gruppen for å knytte sine commits opp mot relevant issue.

Videre har gruppene laget en branch for hver issue som jobbes med. Disse merges så inn til en “dev”-branch. Når en del funksjoner har blitt lagt til i “dev”, vil denne så bli pushet inn i “master” etter reviews av andre i gruppen, da “master”-branchen er beskyttet.

Issues og dokumentasjon er skrevet i norsk, mens kommentering i kode, commits, og branches er på engelsk

#### Testing

Siden det ikke var krav til automatisk testing av koden har vi valgt å gjøre end to end test manuelt. Testing har fåregått på følgende enheter:
- OnePlus 6 (1080 x 2280)
- Samsung Galaxy 10e (1080 x 2280)
- iPhone 6S Plus (750 x 1334)






