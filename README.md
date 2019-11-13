# IT2810 - prosjekt 4

Noen avsnitt i dokumentasjonen er hentet fra prosjekt 3 (bl.a. state management), da det er likheter med dette prosjektet. Vi har valgt å gjenbruke deler av dokumentasjonen for å gi et helhetlig bilde av vårt prosjekt. 


### Starte applikasjon

For å kjøre applikasjonen må man ha Expo appen, som finnes for Android og iOS. Pass på at du er på NTNU nettet for at databasen skal fungere.

#### Kjøre lokalt
Git clone prosjektet til ønsket sted: feks.
```
git clone https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-38/project_4.git
cd studentpolet-app
```
Kjør så kommandoen
```
npm install
```
Start appen
```
npm start
```
eller
```
expo start
```
Følg instruksene til Expo for hvordan du får den opp på mobilen

#### Kjøre eksternt (KUN ANDROID)
Gå inn på linken: https://expo.io/@rotciw/studentpolet-app

Scan QR koden i Expo appen.

### Applikasjonens innhold og funksjonalitet

I dette prosjektet har vi utviklet en søkbar katalog med produkter fra vinmonopolet for iOS og Android. Applikasjonen baserer seg på backend og server fra forrige prosjekt. Brukergrensesnittet er delt inn i to tabs; Hjem og Favoritter. 

#### Detaljert visning

I den detaljerte visningen får man opp et bildet av produktet, all informasjonen vi lagrer om produktet, en link til vinmonopolets nettsider for rask bestilling samt en knapp for å legge til produktet som favoritt. 

#### Filtrering, søk, sortering og paginering

Filtrering, søk, sortering og paginering håndteres i backend.

På hjem-siden kan brukeren søke blant produktene i databasen ved å benytte søkefeltet øverst på siden. Søkefeltet er dynamisk slik at det søker for hvert tegn som endrer seg. Det er mulig å søke på produktnavn, produkttype og land.

Brukere kan legge til filtrering på søkeresultatet ved å trykke på søke-ikonet nede til høyre på siden. Her kan man filtrere på land, årgang, pris, emballasjetype og produktutvalg. Årgang og pris kan filtreres ved å sette en minimums- og maksimumsverdi. Filtrering for land emballasjetype og produktutvalg kan settes ved å trykke på ønsket filter. Brukeren kan trykke på “nullstill filtrering” for å nullstille alle filtre. På samme side kan brukeren spesifisere hva søkeresultatene skal sorteres etter. Når brukeren trykker på hake-ikonet oppdateres spørringen, og det tilhørende resultatsettet vises i listen.

Vi valgte å implementert dynamisk paginering da dette er den vanligste løsningen på mobile enheter. Hvis brukeren scroller til bunnen av siden lastes automatisk de neste 20 elementene inn. På denne måten har vi oppnådd en god ytelse i applikasjonen, samtidig som at funksjonaliteten er brukervennlig. Hvis brukeren endrer søkeord eller filtrering blir pagineringen nullstilt automatisk.

#### Favoritter

Brukere kan legge til produkter som favoritter når de er inne på detaljert visning siden til hvert produkt. Angrer brukeren kan man trykke på samme knapp igjen for å fjerne det fra favoritter. Hjertet på favoritt knappen blir fylt når man har gjort et produkt til favoritt. 

For å se favoritter kan man gå inn på favoritt siden hvor alle favoritter man har så langt vil ligge i en liste tilsvarende søk listen. Her kan man gå gå til detaljert visning eller fjerne produkter direkte ved å “Swipe” produktet mot venstre og trykke på fjern knappen. 

### Teknologi

##### React Native

Prosjektet baserer seg på React Native, som har mange likhetstrekk med React. 
Av den grunn har vi valgt å gjenbruke noe av oppsettet og logikken fra prosjekt 3. 
Både komponentstrukturen og flere av funksjonene i prosjektet er relativt lik. Vi har koblet appen opp mot serveren og databasen vi satt opp i prosjekt 3 på tilsvarende måte med Apollo. React Native støtter ikke HTML- eller CSS-syntax. Derfor har vi  benyttet React Native komponenter (feks. View fremfor div), og style sheets. Brukergrensesnittet er endret slik at det er i samsvar med vanlige konvensjoner for mobile applikasjoner. Vi har i hovedsak benyttet tredjepartskomponenter fra `react-native` og `react-native-elements` for Text, View, ScrollView, FlatList, Modal osv. Videre har vi benyttet en range slider fra `@ptomasroos/react-native-multi-slider` for filtrering på årgang og pris. 

Vi har forsøkt å gjøre koden så modulær som mulig slik at kompoentene våre enkelt kan gjenbrukes. Samtidig fører dette til en oversiktlig kodebase som enkelt kan vidreutvikles av andre. Koden er skrevet i ES6, med ESLint som linter.

For vår FlatList komponent har vi valgt å lage egen komponent for hvert objekt i listen. Gruppen prøvde først med React Elements sin ListItem komponent, men så dårlige resultater på hastighet. Dermed ble det laget en egen komponent for dette med React sin PureComponent, slik at props og state blir shallow sammenliknet, noe vanlig Component ikke gjør.
<img src="https://imgur.com/mTxXdf7.png" width="600px" alt="MobX Store"/>

##### Expo

I henhold til kravspesifikasjonen har vi benyttet verktøyet Expo i dette prosjektet. Dette har gjort utviklingsprosessen enkel og effektiv. Verktøyet muliggjør bl.a. for fortløpende dynamsik testing på mobile enheter. Prosjektet er initialisert med `expo init my-new-project`, og kan kjøres med `npm start`. Deretter kan en scanne QR-koden som kommer opp i terminalen for å åpne appen på iOS eller Android. Vi valgte å benytte malen "tabs" fra Expo slik at vi fikk en grunnmur å jobbe ut ifra. Denne inneholder bl.a. navigering ved hjelp av faner nederst på skjermen, samt. et forslag til filstruktur. 

##### ApolloClient

ApolloClient tar imot GraphQL spørringene og sender de til serveren, og fetcher dataen i UIet.

<img src="https://imgur.com/cA1mFNI.png" width="400px" alt="MobX Store"/>


##### AsyncStorage

For å lagring mellom hver gang man kjører appen har vi brukt AsyncStorage. 
Vi har valgt å lagre favoritter slik at man slipper å huske på å søke opp produkter man liker flere ganger. I AsyncStorage lagrer vi all dataen om et produkt slik at man kan få opp all informasjon når man ser den detaljerte visningen til hvert produkt.

Favoritter lagres og fjernes via den detaljerte visningen og kan i tillegg fjernes ved å bruke fjern knappen etter å ha dratt et produkt i siden i favoritt visningen. 

##### MobX og state management

Gruppen valgte å bruke MobX for state management for prosjektet da det var dette rammeverket vi benyttet i forrige prosjekt.

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
    modalStore={rootStore.modalStore}
    favoriteStore={rootStore.favoriteStore}
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
Under er et eksempel på sammenhengen av MobX og `FilterGroup` komponenten.

Ved å kjøre en “action” på `FilterGroup`, kjøres f.eks. en funksjon i `FilterStore` som kan oppdatere en variabel (state) i samme store. Denne kan da Table som også er en “observer”, ta imot og vise.

<img src="https://imgur.com/0D9qGCe.png" width="600px" alt="MobX Store"/>

Eksempel med kun FilterStore. Andre stores og komponenter vises ikke i figuren.

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


#### Variabelnavn

Variabelnavnene i frontend bruker camelCase, og engelsk. I backend henger variabelnavnene fra prosjekt 3, der det brukes uppercase for variabelnavn og på norsk, ettersom data fra vinmonopolet sine data var på norsk. Der backend variabler refereres i frontend er det dermed ulikt.
