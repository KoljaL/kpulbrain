# Brainload2

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

