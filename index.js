// Your code here
function createEmployeeRecord(empArr) {
    return {
        firstName: empArr[0],
        familyName: empArr[1],
        title: empArr[2],
        payPerHour: empArr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(nestedEmpArr) {
    return nestedEmpArr.map(createEmployeeRecord);
} 

function createTimeInEvent(empRecord, dateTimeStr) {
    empRecord.timeInEvents.push({
                                type: "TimeIn",
                                date: dateTimeStr.slice(0, 10),
                                hour: parseInt(dateTimeStr.slice(11))
                                });
    return empRecord;
}

function createTimeOutEvent(empRecord, dateTimeStr) {
    empRecord.timeOutEvents.push({
                                 type: "TimeOut",
                                 date: dateTimeStr.slice(0, 10),
                                 hour: parseInt(dateTimeStr.slice(11))
                                 });
    return empRecord;                            
}

function hoursWorkedOnDate(empRecord, workDay) {
    let timeOut = empRecord.timeOutEvents.find(element => element.date === workDay).hour;
    let timeIn = empRecord.timeInEvents.find(element => element.date === workDay).hour;

    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(empRecord, workDay) {
    return empRecord.payPerHour * hoursWorkedOnDate(empRecord, workDay);
}

function allWagesFor(empRecord) {
    const totalWages = empRecord.timeInEvents.reduce((total, timeIn) => {
         total += wagesEarnedOnDate(empRecord, timeIn.date);
         return total;
    }, 0);
    return totalWages;
}

function calculatePayroll(employees) {
    const wages = employees.map(employee => allWagesFor(employee))
    const payroll = wages.reduce((total, wage) => {
        total += wage; 
        return total;
    }, 0);
    return payroll;
}

