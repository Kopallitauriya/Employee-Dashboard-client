import axios from "axios"

const url=process.env.REACT_APP_API_URL

const createDataSets = async () => {
  const res = await axios.get(`${url}/user?page=1`);
  if (res?.data?.success) {
    const userData = res.data.data.data;

    const sendData = {
      salary: getSalaryData(userData),
      age: getAgeData(userData),
      departmentwiseEmployeeCount: getDepartmentEmployeeCount(userData)
    }
    return sendData;

  }
}

function getAgeData(userInfo) {
  const labels = Array(10).fill('0');
  const dataset = Array(10).fill(0);
  const sortByAge = userInfo.sort((a, b) => a.age - b.age);
  const maxAge = sortByAge[sortByAge.length - 1]?.age;
  let partition = Math.ceil(maxAge / 10);
  let start = 0;
  for (let i = 0; i < sortByAge.length; i++) {
    let temp = parseInt(sortByAge[i].age / partition)
    if (temp >= 10) temp = 9
    dataset[temp]++;
  }

  for (let i = 0; i < labels.length; i++) {
    labels[i] = start + '-' + (start + partition);
    start = start + partition + 1;
  }

  const data = {
    labels: labels,
    datasets: [{
      label: 'Age distribution',
      borderWidth: 1,
      data: dataset,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],

    }]
  };
  return data;
}


function getSalaryData(userInfo) {
  const labels = Array(10).fill('');
  const dataset = Array(10).fill(0);
  const sortBysalary = userInfo.sort((a, b) => a.salary - b.salary);
  const maxsalary = sortBysalary[sortBysalary.length - 1]?.salary;
  let partition = parseInt(maxsalary / 10);
  let start = 0;
  for (let i = 0; i < sortBysalary.length; i++) {
    let temp = parseInt(sortBysalary[i].salary / partition)
    if (temp >= 10) temp = 9
    dataset[temp]++;
  }

  for (let i = 0; i < labels.length; i++) {
    labels[i] = start + '-' + (start + partition);
    start = start + partition + 1;
  }

  const data = {
    labels: userInfo.map((itm) => itm.salary),
    datasets: [{
      label: 'Salary distribution',
      backgroundColor: 'rgba(255,0,0,0.5)',
      borderColor: 'red',
      outlierColor: '#999999',
      padding: 10,
      itemRadius: 1,
      borderWidth: 1,
      data: userInfo.map((itm) => itm.salary)
    }]
  };
  return data;

}


function getDepartmentEmployeeCount(userInfo){
  const hashmap = {};
  for (let i = 0; i < userInfo.length; i++) {
    const itm = userInfo[i];
    if(hashmap.hasOwnProperty(itm.department)){
      hashmap[itm.department] = hashmap[itm.department]+1;
    }else{
      hashmap[itm.department] = 1;
    }
  };

  const data = {
    labels: Object.keys(hashmap),
    datasets: [{
      label: 'Employee Count per Department',
      padding: 10,
      data: Object.values(hashmap)
    }]
  };
  return data;
}

export default createDataSets;