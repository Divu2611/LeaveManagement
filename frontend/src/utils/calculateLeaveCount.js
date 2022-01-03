const calculateLeaveCount = (startDate,endDate) => {

    var leaves = 0;
    const dayMilliSecond = 1000*60*60*24;

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    while(startDate<=endDate){
        leaves++;

        var day = startDate.getDay();
        if(day === 0 || day === 1){
            leaves--;
        }

        startDate = new Date(+startDate +dayMilliSecond);
    }

    return leaves;
}
 
export default calculateLeaveCount;