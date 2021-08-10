
![gh-kpubrain.svg](https://rasal.de/img/gh-kpubrain70.svg) 

# KpUlBrain

## Funktionen


## Seiten
Jede Seite ist über das Menü im Header erreichbar.

### Profil
Alle Werte werden im Objekt "Profil" gespeichert. Änderungen sind jederzeit möglich, eine Änderung überschreibt den alten Wert.  



### Mood
Alle Werte werden im Objekt "Mood" gespeichert. Änderungen sind nicht möglich. Jedes Speichern erzeugt einen neuen Datensatz mit dem aktuellen Timestamp als Property.  


## Datenablaufplan

Alle Daten werden vom Browser im localstorage in einer Datei im JSON Format gespeichert.   
Der Dateiname ist der md5-hash aus dem Namensfeld im Profil.
Das JSON Objekt der Datei hat zwei Properties: **Profil** und **Mood**. Beide werden beim ersten Programmstart angelegt.   





## ToDos

### Profil
- Daten freigeben Funktion wiederherstellen

### Formular
- abzufragende Wirkungen festlegen (können die nutzerzeitig abgewählt werden?), Farben zuordnen
- Medikamentenliste übersichtlicher?
- eigenes Medikament hinzufügen?
- Medikamente als Preset im Profil speichern?
- Zyklusphase angeben, wie?
- Sliderrange -5 bis +5, wirklich?

### Chart
- innerhalb der Wirkzeit

### Hilfe
- zu jedem Eingabefeld eine Erklärung, nach Seiten aufgelistet
- Datenschutzerklärung


### Allgemein
- Farben (zweites Theme?)

### Server
- lokal verschlüsseln, wie auf dem Server entschlüsseln?
