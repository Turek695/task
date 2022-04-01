Zadanie:
Zadanie polega na wyświetlaniu listy produktów w htmlu wykorzystując ajax do pliku products.json który zawiera objekt JSON 
zawierający nazwę produktu, statusu produktu oraz cenę. 
Na liście należy dodać select do filtrowania produktów po statusach ("prod_status": "recommended|saleout|bestseller|promotion|new",).
Lista powinna być responsywna. 
Zdjęcie do produktu może być zwykły placeholder. 

plan:
10. pobrać dane z pliku json
20. wyświetlić na stronie dane o 1 produkcie
30. wyświetlić na stronie dane o wszystkich produktach
40. zrobić style kontenerów
50. uporządkować widok storny
60. 

realizacja:
10. pobrać dane z pliku json i przepisać do obiektu JS
    11. ajax nie działa na plikach lokalnych!! postawić lokalny server http: 
    https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
    cd D:\OneDrive\Dokumenty\Web-Dev\Sky-Shop\
    py -m http.server
    http://localhost:8000/
    12. przepisać do prods
    13. wyświetlić w konsoli
20. Wyświetlić wyniki na stronie
    21. wyświetlić ceny wszystkich produktów na stronie w JS
    22. wyświetlić wszystkie parametry na stronie w JS
    23. pogrupować wszystkie parametry w kontenerach produktów w JS
    24. wyświetlić status tylko dla produktów zawierających status w JS
    25. zaprojektować okienko produktu w HTML i styli w CSS dla wzorcowego okienka
    26. przebudować tworzenie wyświetlania elementów w JS
    27. rozdzielić statusy do osobnych elementów
30. stworzyć selektor prod_status
     31. ...w HTML i CSS
     32. rozwinąć wyświetlanie produktów o czyszczenie galerii w JS
     33. rozwinąć wyświetlanie produków o filtr prod_stat
