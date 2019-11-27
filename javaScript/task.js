        // Task 0
        //  Create unique array and count the number of items and store in object for each item
        console.log('\n\n','Task 0\n');
        var languages = ['java','c','js','python','go','c#','java','c','js','python','go','c++','java','c','js','python','java','c','js','python','go','php'];
        var unique=[];
        var obj={};
        languages.forEach(function(value,index){
            if(unique.indexOf(value)==-1){
                unique.push(value);
                obj[value]=0;
            }
        });
        console.log(unique);
        languages.forEach(function(value,index){
            if(obj.hasOwnProperty(value))
                obj[value]+=1;
        });
        console.log(obj);


        //task 1
        //pattern of star
        console.log('\n\n','Task 1\n');
        var num=10;
        function astrickPattern(num){
            var str='';
            for(var i=num;i>0;i--){
                var line='';
                for(var j=i;j>0;j--){
                line+='*';
                if(j==1)
                    line+="\n";
                }
                str=str+line;
            }

            return str;    
        }
        console.log(astrickPattern(num));


        //task 2
        //Pring education array values
        console.log('\n\n','Task 2\n');
        var myInfo = {name:"Punya Ram Duwal",address:"Bhaktapur",emails:"duwalsusan8@gmail.com",interests:"Cycling",
        education:[{name:'Tara Secondary School',enrolledDate:2070},{name:'Khwopa College',enrolledDate:2072}],};
        myInfo.education.forEach(function(value,index){
            console.log(value);
        });



        //task 3    Searching object content
        console.log('\n\n','Task 3\n');
        var fruits = [
                {id: 1, name: 'Banana', color: 'yellow'},
                {id: 2, name:'Apple', color: 'Red'}
            ];
        function searchByName(fruits,fruitName){
            var found = false;
            for (const key in fruits) {
                if(fruits[key].name.toUpperCase()===fruitName.toUpperCase()){
                    return fruits[key];
                }
            }
            if(found == false){
                return fruitName + ' named fruit is not found!!!';
            }
            // return fruits.filter(function(fruit){return fruit.name.toUpperCase()==fruitName.toUpperCase()})[0];
        }
        
        console.log('Search by name result  >',searchByName(fruits,'mm'));
        console.log('Search by name result  >',searchByName(fruits,'apple'));


        function searchBykey(fruits, key, value){
            return fruits.filter(function(fruit){
                return fruit.hasOwnProperty(key)&&fruit[key]==value
            })[0];
        }
        console.log('Search by key and name >',searchBykey(fruits,"name",'Banana'));
        


        //task 4    
        console.log('\n\n','Task 4\n');
        var numbers =[1,2,3,4];

        function transform(collection , tranFunc){
            var newNum = collection.map(function(item){
                return tranFunc(item);
            });
            // newNum.forEach(function(value,index){
            //     newNum[index]=tranFunc(value);
            // });
            return newNum;
        }

        var output = transform(numbers, function(num){
            return num/2;
        });

        console.log("Input array    >",numbers);
        console.log("Output of the function >",output);


        //task 5    Sorting array of objects
        console.log('\n\n','Task 5\n');
        var arr = [{id: 1,name: 'John'},
        {id: 3, name: 'Mary'}, 
        {id: 2, name: 'Andrew'}];

        function SortBy(arr, key){
            var newArray = arr.map(function(item){
                return Object.assign({},item);
            });
            
            newArray.sort(function(a,b){
                // console.log("a and b value  >",a,b);
                if(b[key]<a[key])
                    return 1;
                else if(b[key]>a[key])
                    return -1;
                else
                    return 0;
            });
            return newArray;
        }

        var sorted = SortBy(arr,'name');
        console.log("Not sorted   >",arr);
        console.log("Sorted   >",sorted);



        // task 6 normalization

        // Expected Output format
        // var output = {
        //     '1': { id: 1, name: 'John', children: [2, 3] },
        //     '2': { id: 2, name: 'Sally' },
        //     '3': { id: 3, name: 'Mark', children: [4] },
        //     '4': { id: 4, name: 'Harry' },
        //     '5': { id: 5, name: 'Mike', children: [6] },
        //     '6': { id: 6, name: 'Peter' }
        // };
        console.log('\n\n','Task 6\n');
        var input = {
            '1': {
              id: 1,
              name: 'John',
              children: [
                { id: 2, name: 'Sally' },
                { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
              ]
            },
            '5': {
              id: 5,
              name: 'Mike',
              children: [{ id: 6, name: 'Peter' }]
            },
            '7': {
                id: 7,
                name: 'John',
                children: [
                  { id: 8, name: 'Sally' },
                  { id: 9, name: 'Mark', children: [{ id: 10, name: 'Harry', children: [{id: 11, name: 'susan'}] }] }
                ]
              }
        };

        function normalize(obj){
            var line={};
            if(obj.hasOwnProperty('children')){
                line[obj.id]={id : obj.id, name : obj.name, children: []};
                obj.children.forEach(function(item){
                    line[obj.id].children.push(item.id);
                });
                obj.children.forEach(function(item){
                    return line=Object.assign(line, normalize(Object.assign({},item)) );
                });

                return line;
            }else{
                line[obj.id]={id : obj.id, name : obj.name};

                return line;
            }
        }

        var result ={};
        for (const key in input) {
            var obj = JSON.parse(JSON.stringify(input[key]));
            result = Object.assign(result,normalize(obj));
        }
        console.log(input);
        console.log(result);

    // var deep = [[[[{hi:'hello'}]]]];
    // var deepCopy = JSON.parse(JSON.stringify(deep));
    // deepCopy[0][0][0].me = 'mutable';
    // console.log(deep);
    // console.log(deepCopy);