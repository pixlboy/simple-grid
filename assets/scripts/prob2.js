    let DATA = [{
            "emp_id": 1001,
            "emp_name": "Nagesh Y",
            "emp_designation": "Manager",
            "department": "Java2Novice",
            "salary": 30000,
            "direct_reports": [
                "Nataraj G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "MG Road",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1002,
            "emp_name": "Nilesh Z",
            "emp_designation": "Support",
            "department": "Java2Novice",
            "salary": 25000,
            "direct_reports": [
                "Nataraj G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "CV Raman Nagar",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1003,
            "emp_name": "Ramesh",
            "emp_designation": "IT",
            "department": "Java2Novice",
            "salary": 35000,
            "direct_reports": [
                "Sumit G",
                "Raju",
                "Mahima"
            ],
            "address": {
                "street": "CV Raman Nagar",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1004,
            "emp_name": "Vivek",
            "emp_designation": "IT",
            "department": "Eloqua",
            "salary": 12500,
            "direct_reports": [
                "Sumit G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "Indira Nagar",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1005,
            "emp_name": "Sumit G",
            "emp_designation": "IT",
            "department": "Eloqua",
            "salary": 15000,
            "direct_reports": [
                "Sumit G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "Indira Nagar",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1006,
            "emp_name": "Mahima",
            "emp_designation": "HR",
            "department": "Q2c",
            "salary": 125000,
            "direct_reports": [
                "Sumit G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "Indira Nagar",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1007,
            "emp_name": "Apoorva",
            "emp_designation": "HR",
            "department": "Q2c",
            "salary": 120000,
            "direct_reports": [
                "Sumit G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "Vivek Nagar",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1008,
            "emp_name": "Apoorv",
            "emp_designation": "HR",
            "department": "Q2c",
            "salary": 130000,
            "direct_reports": [
                "Sumit G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "Kasturba Nagar",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1009,
            "emp_name": "Shaktiman",
            "emp_designation": "HR",
            "department": "Q2c",
            "salary": 20000000,
            "direct_reports": [
                "Sumit G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "Mysore Road",
                "city": "Bangalore"
            }
        },
        {
            "emp_id": 1010,
            "emp_name": "Rohini",
            "emp_designation": "Sales",
            "department": "Q2c",
            "salary": 200,
            "direct_reports": [
                "Sumit G",
                "Kalyan",
                "Mahitha"
            ],
            "address": {
                "street": "Marathahalli",
                "city": "Bangalore"
            }
        }
    ];

    class Table {

        constructor(sort) {
            this.sort = sort || 'asc';
        }

        setSort(sort){
            this.sort = sort
        }

        getSort(){
            return this.sort;
        }

        genarateHead(config){
            let columns = [];
            if(config.length){
                for(let column of config){
                    columns.push(`<th class="sort" id="${column.id}">${column.name}</th>`);
                };
            }
            let tHead = `<thead><tr>${columns.join('')}</tr></thead>`;
            return tHead;
        }

        genarateBody(data){
            let rowsLength = data.length || 0;
            let rows = [];
            if(rowsLength){
                for(let row of data){       //data is an array
                    let columns = [];
                    for(let column in row){     //row is an object
                        if(typeof row[column] === 'object' && !row[column].length){     //in case data is object
                            columns.push(`<td>${Object.values(row[column])}</td>`);
                        } else{ //in case data is not an object
                            columns.push(`<td>${row[column]}</td>`);
                        }
                    }
                    rows.push(`<tr>${columns.join('')}</tr>`);
                };
            }
            return `${rows.join('')}`;
        }

        genarateGrid(data, config){
            let tHead = this.genarateHead(config);
            let tBody = `<tbody>${this.genarateBody(data)}</tbody>`;
            return `<table class="table">
                ${tHead}
                ${tBody}
            </table>`;
        }

        updateGrid(data){
            let tBody = this.genarateBody(data);
            return tBody;
        }
    }

    document.addEventListener("click", (event) => {
        if(event.target.className.includes('sort')){
            const sortColumn = event.target.id;
            if (table.getSort() === 'asc'){
                table.setSort('desc');
                document.querySelector(".sort-asc") ? document.querySelector(".sort-asc").classList.remove('sort-asc') : null;
                event.target.classList.remove('sort-asc');
                event.target.classList.add('sort-desc');
            } else{
                table.setSort('asc');
                document.querySelector(".sort-desc") ? document.querySelector(".sort-desc").classList.remove('sort-desc') : null;
                event.target.classList.remove('sort-desc');
                event.target.classList.add('sort-asc');
            }
            let data = _.orderBy(DATA, sortColumn, table.getSort());
            let grid = table.updateGrid(data, tableConfig);
            document.querySelector("#wrapper table tbody").innerHTML = grid;
        }
    });

    let filter = document.querySelector(".filter");
    filter.addEventListener("keyup", (event) => {
        let value = event.target.value.toLowerCase();
        if(value.length){
            let data = DATA;
            let filterData = _.filter(data,
                (item) => {
                    return item.emp_id == value ||
                        item['emp_name'].toLowerCase().includes(value) ||
                        item['emp_designation'].toLowerCase().includes(value) ||
                        item['department'].toLowerCase().includes(value) ||
                        item['salary'] == value
            });
            let grid = table.updateGrid(filterData, tableConfig);
            document.querySelector("#wrapper table tbody").innerHTML = grid;
        } else{
            let grid = table.updateGrid(DATA, tableConfig);
            document.querySelector("#wrapper table tbody").innerHTML = grid;
        }
    });


    let tableConfig = [
        {
            id : 'emp_id',
            name : 'Emp ID'
        },
        {
            id : 'emp_name',
            name : 'Name'
        },
        {
            id : 'emp_designation',
            name : 'Designation'
        },
        {
            id : 'department',
            name : 'Department'
        },
        {
            id : 'salary',
            name : 'Salary'
        },
        {
            id : 'direct_reports',
            name : 'Direct reports'
        },
        {
            id : 'address',
            name : 'Address'
        }
    ];

    let table = new Table();

    // window.fetch("http://www.mocky.io/v2/5b404436340000cf1c001cf3").then((res) => {
    //     console.log(res.data);
    //     let grid = table.genarateGrid(DATA, tableConfig);
    //     document.querySelector("#wrapper").innerHTML = grid;
    // });

    let grid = table.genarateGrid(DATA, tableConfig);
    document.querySelector("#wrapper").innerHTML = grid;
