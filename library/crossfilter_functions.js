

        function print_filter(filter){
            var f=eval(filter);
            if (typeof(f.length) != "undefined") {}else{}
            if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
            if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
            console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
        };




        function getMonthName(v) {
        var n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return n[v]
        };



        function num_format(){
         var numFormat = d3.format(".3s")


        }



        function generateYearMonth(lst){
            // Author: Koba
            // Generates an array of full year concatenated woth a month number. 
            // Ex.g., generateYearMonth(['20140','20142') will give ['20140','20141','20142']
            var nlst = []
            nlst.push(lst[0])
            var counter = 0
            var year = parseInt(nlst[counter].substring(0,4))
            var month = parseInt(nlst[counter].substring(4,6))
            
            while (nlst[nlst.length-1] != lst[lst.length-1]){    
                month += 1
                
                if(month % 12 === 0){
                    year += 1
                    month = 0
                }
                
                nlst.push(String(year) + String(month))
                counter += 1
            }
            return nlst
        }

        function filtered_group(group, bins) {
            return {
            all:function () {
            return group.all().filter(function(d) {
            return bins.indexOf(d.key) != -1;
            })
            }
            }
        };



        function crossfilter_array_format(params){
        	lst = params.data
        var Strings = params.strings ||['Name','Type','StageName','Red_Account_Notes__c','OTF__c','Status_Notes__c','Account.Name','LeadSource','Industry__c','Success_Manager__c','Market_Developer__c','Product_Names__c'];
        var Dates = params.dates||['CloseDate','Contract_Start_Date__c','Contract_End_Date__c'];
        var Integers = params.numbers||['Amount','MRR__c','Probability','Account.Days_Since_Original_Close_Date__c'];

        lst.forEach(function (d) {

        Strings.forEach(function(key){d[key] = String(d[key]) || "None";});
        Dates.forEach(function(key){d.key = d.key || "9/30/10";});
        Dates.forEach(function(key){d[key] = new Date(d[key] + ' EST');});
        Dates.forEach(function(key){d[key + "Formatted"] = d3.time.format("%m/%d/%y")(d[key])});
        Dates.forEach(function(key){d[key + "YearString"] = d3.time.format("%y")(d[key])});
        Dates.forEach(function(key){d[key + "DayNumber"] = d3.time.format("%d")(d[key])});
        Dates.forEach(function(key){d[key + "Week"] = d[key].getWeek(1)});
        Dates.forEach(function(key){d[key + "MonthName"] = getMonthName(d[key].getMonth())});
        Dates.forEach(function(key){d[key + "YearMonth"] = String(d[key].getFullYear()) + String(d[key].getMonth())});
        Dates.forEach(function(key){d[key + "Quarter"] = String(d[key].getFullYear()) + String(Math.floor((d[key].getMonth() + 3) / 3))});
        Dates.forEach(function(key){d[key + "WeekDay"] = d[key].getDay()+"."+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d[key].getDay()]});
        Dates.forEach(function(key){d[key + "Year"] = d[key].getFullYear('EST')});
        Dates.forEach(function(key){d[key + "MonthNumber"] = d[key].getMonth()}); 
        Dates.forEach(function(key){d[key + "Month"] = d3.time.month(d[key])}); 
        Integers.forEach(function(key){d[key]=d[key]||"0";});
        Integers.forEach(function(key){d[key] = parseInt(d[key], 10)});
        Integers.forEach(function(key){d[key + "Formatted"] =   d3.format(",.0f")(d[key])}); 

        });

        return lst


        }




        function crossfilter_generate(params){
        	lst = crossfilter_array_format(params)
        	var ndx = crossfilter(lst);


        function pie_chart_crossfilter(params,D,N,S) {
        	ndx = params.ndx||ndx
        	D = params.dimension||D
        	N = params.metric||N
        	S = params.chart_selector ||S
            var D1 = ndx.dimension(function (d) {return d[D];})
            var Chart = dc.pieChart(S)
            var Sum = ndx.groupAll().reduceSum(function (d) {return d[N];})

            Chart
            .width(370).height(200).radius(90).innerRadius(40)
            .dimension(D1)
            .group(D1.group().reduceSum(function (d) {return d[N];}))
            .label(function (d) {return d.key + " (" + (d.value / Sum.value() * 100).toFixed(2) + "%" + ")";})
            .legend(dc.legend().x(290).y(10).itemHeight(13).gap(4))
            .renderLabel(true);

        }

         	pie_chart_crossfilter({},'Cup','Top Sizes','#chart');
         	//pie_chart_crossfilter({},'Dress','Top Sizes','#chart2');

        	dc.renderAll();

        }



        function crossfilter_filter(params){
        	ndx = params.ndx
        var D = params.dimension||"CloseDateYearString"
        var CloseDateYearFilter = ndx.dimension(function (d) {return d[D];})
        var types = params.types||['14','15']
        CloseDateYearFilter.filter(function(d) {return types.indexOf(d) > -1});


        }













