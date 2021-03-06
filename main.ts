//Eksempel 5: NU MED OBSERVER
import { Observable } from 'rxjs';

let button = document.getElementById('button');
let click = Observable.fromEvent (button, 'click')

function get(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if( xhr.readyState === 4 && xhr.status === 200)
            {
                observer.next(JSON.parse(xhr.responseText));
                observer.complete();
            }
        } 

        xhr.open("GET", url);
        xhr.send();
    });
    


    
}

function renderMovies(movies){
    movies.forEach(element => {
        let div = document.createElement("div");
        div.innerHTML = element.title
        document.getElementById('output')
            .appendChild(div);
            
    });
}

//LAZY: get('movies.json') kontra: get('movies.json').subscribe(renderMovies) ; - sidste loader når siden loader

//clik er i forven en observable så val bliver af typen Observable - eftersom get returnerer en sådan
//click.map(e => get('movies.json')).subscribe(val => console.log(val))
//skal man have den inner observable i tale
click.flatMap(e => get('movies.json'))
    .subscribe(renderMovies,  //shorthand for: .subscribe(val => renderMovies(val));
        e => console.log(e),
        () => console.log("complete")
);



// click.subscribe (
//     value => get('movies.json'),
//     e => console.log(e),
//     () => console.log('complete')

// );

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



// //Eksempel 4: GETTING READY TO RECEIVE DATA FROM XMLHTTPREQUEST
    // import { Observable } from 'rxjs';

    // let outputArea = document.getElementById('output');
    // let button = document.getElementById('button');

    // //OBSERVABLE
    // //var source = Observable.fromEvent(button, "click");
    // var click = Observable.fromEvent(button, "click");




    // //OBSERVER
    // function load(url: string) {
    //     let xhr = new XMLHttpRequest();
    //     // //Event: load
    //     // xhr.addEventListener("load", () => {
    //     //     let txtResp = xhr.responseText;
    //     //     console.log(txtResp);
    //     // });
        
    //     xhr.onreadystatechange = () => {
    //         if(xhr.readyState === 4 && xhr.status === 200)
    //         {
    //             console.log (xhr.responseText);

    //             //let movies = JSON.parse(txtResp);
    //             //movies.foreach..
    //         }
    //     }

    //     xhr.open("GET", url);
    //     xhr.send();

    // }

    // const url: string = 'movies.json';
    // click.subscribe(
    //     data => load(url),
    //     e => console.log(e),
    //     () => console.log('complete')
    // )
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// //Eksempel 3: TRAILING CIRCLE - CHECK HTML I INDEX
    // import { Observable } from 'rxjs';

    // let circleDiv = document.getElementById('circle');
    // let source = Observable.fromEvent (document, 'mousemove')
    //     .map((e: MouseEvent) =>{
    //         return {
    //             x: e.clientX,
    //             y: e.clientY
    //         };
    //     }).delay (300) ;

    // function onNext (value) {
    //     circleDiv.style.left = value.x;
    //     circleDiv.style.top = value.y;
    // }


    // source.subscribe (
    //     value => onNext(value), //shorthand - just write onNext,
    //     e => console.log(`error ${e}`),
    //     () => console.log ('completed')
    // );
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::    


// //Exempel 2: MAP() AND FILTER()
    // import { Observable } from 'rxjs';

    // let source = Observable.fromEvent(document, 'mousemove')
    //     .map ((e: MouseEvent) => {
    //         return {
    //             x: e.clientX,
    //             y: e.clientY
    //         }
    //     }).filter (value => value.x < 500);

    //     source.subscribe(
    //         value => console.log (value),
    //         e => console.log(`error: ${e}`),
    //         () => console.log('completed')
    //     );
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// //Eksempel 1: MOUSEEVENTS
    // import { Observable }  from 'rxjs';

    // let source = Observable.fromEvent(document, "mousemove") //fromEvent -> DOM events

    // source.subscribe (
    //     value => console.log(value),
    //     e => console.log (`error: ${e}`),
    //     () => console.log('complete')
    // )
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::









//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//MODULE 2
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// //Eksempel 6: OPERATORS
    // //The observable stream : Observable.create().map().filter() etc

    //  import { Observable, Observer } from 'rxjs'; // temmelig stor (ca 800 kb)
    //  //I stedet kan du vælge præcist fx hvilke operatore du vil importere
    //  //import { Observable } from 'rxjs/Observable';  //core funktionalitet importeres
    //  //import 'rxjs/add/opreator/map';
    //  //import 'rxjs/add/opreator/filter';

    //  let numbers = [1, 5, 10];
    //  let source = Observable.create(observer => {

    //     let index = 0;
    //     let produceValue = () => {
    //         //vi sender værdien
    //         observer.next (index++);

    //         if (index < numbers.length) {
    //             setTimeout(produceValue, 250);
    //         } else {
    //             observer.complete();
    //         }
    //     }

    //     produceValue();

    // })
    // .map (x => x*10) //se marble diagrammet
    // .filter(x => x > 4);  //0 forsvinder

    // source.subscribe (
    //     value => console.log (`value: ${value}`),
    //     e => console.log (`error: ${e}`),
    //     () => console.log('completed')
    // );
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// //Eksempel 5: LONGRUNNING
    // /*
    // Simulering af async kald
    // */
    //  import { Observable } from 'rxjs';

    //  let numbers = [1, 5, 10];
    //  let source = Observable.create(observer => {

    //     let index = 0;
    //     let produceValue = () => {
    //         //vi sender værdien
    //         observer.next (index++);

    //         if (index < numbers.length) {
    //             setTimeout(produceValue, 2000);
    //         } else {
    //             observer.complete();
    //         }
    //     }

    //     produceValue();
    
    // });

    // source.subscribe (
    //     value => console.log (`value: ${value}`),
    //     e => console.log (`error: ${e}`),
    //     () => console.log('completed')
    // );

    // // //prøv at sette endnu en lytter op
    // // source.subscribe (
    // //     value => console.log (`value: ${value}`),
    // //     e => console.log (`error: ${e}`),
    // //     () => console.log('completed')
    // // );
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



// //Eksempel 4: OBSERVABLE.CREATE()
    // /*
    // Oberservable´s create metode giver os større kontrol over hvordan og hvornår eventen trigges
    // */
    // import { Observable } from 'rxjs';

    // let numbers = [1, 5, 10];
    // let source = Observable.create(observer => {
    //     for (const key of numbers) {

    //         // Implementering af fejl...
    //         // if (key === 5) {
    //         //     observer.error("Something went wrong...")
    //         // }

    //         observer.next(key); //her sendes key afsted
    //         }
        
    //     //kommenteres denne linie ud kaldes complete aldrig
    //     observer.complete();
    // });

    // source.subscribe (
    //     value => console.log (`value: ${value}`),
    //     e => console.log (`error: ${e}`),
    //     () => console.log('completed')
    // );
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



// //Eksempel 3: AINT THE SIZE THAT MATTERS
    // /*
    // source.subscribe (next,error,completed) er en alternativ men kortere tilgang
    // */
    // import { Observable, Observer } from 'rxjs';

    // let numbers = [1, 5, 10];
    // let source = Observable.from(numbers);

    // source.subscribe (
    //     value => console.log (`value: ${value}`),
    //     e => console.log (`error: ${e}`),
    //     () => console.log('completed')
    // );
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



// //Exempel 2: IMPLEMENT OBSERVER ABSTRACT
    // import { Observable, Observer } from 'rxjs';

    // let numbers = [1, 5, 10];
    // let source = Observable.from(numbers);

    // class MyObserver implements Observer<number> {
    //     next (value){
    //         console.log(`value: ${value}`);
    //     }

    //     error(e) {
    //         console.log(`error ${e}`)
    //     }

    //     complete() {
    //         console.log('completed')
    //     }
    // }

    // source.subscribe(new MyObserver());
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



// //Exempel 1: NEXT (), ERROR (), COMPLETE ()
    // import { Observable } from 'rxjs';
    // /* Noter
    //     source repræsenterer en kilde

    //     Observable.from() tager en subscribable, et promise eller et array
    //     from sender så styk for styk indholdet af source

    //     source.subscribe kører hver gang sourcen pumper en ny værdi ud

    //     new MyObserver() er en instans af en klasse der indeholder funktionalitet for
    //         next() (kører hver gang value ændre sig)
    //         error()
    //     complete() (kører kun når sourcen med sikkerhed har afsluttet sit sidste push)
    // */

    // let numbers = [1, 5, 10];
    // let source = Observable.from(numbers)

    // class MyObserver {
    //     next (value){
    //         console.log(`value: ${value}`);
    //     }

    //     error(e) {
    //         console.log(`error ${e}`)
    //     }

    //     complete() {
    //         console.log('completed')
    //     }
    // }

    // source.subscribe(new MyObserver());
    // // du kan sagtens have flere subscribers
    // // source.subscribe(new MyObserver());
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::