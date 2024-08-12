# ---------------------- Perform operation related to DataTypes ---------------------- #

# 1. Identify DataType
numOfStudents = 119;
print(type(numOfStudents));

waterInL = 23.4;
print(type(waterInL));

name = "Sarvesh Naik";
print(type(name));

# 2. Arithmatic and Concatination Operataions
num1 = 34;
num2 = 23;
sumOfNum = num1 + num2;
print("Sum = ", sumOfNum);

numOfAdmission = 120;
numOfDrops = 13;
finalStudents = numOfAdmission - numOfDrops;
print("Final Studnets = ", finalStudents);

radius = 4;
pi = 3.14;
areaOfCircle = radius * radius * pi;
print("Area of circle = ", areaOfCircle);

totalBill = 3400;
numOfPeople = 4;
spiliValue = totalBill / numOfPeople;
print("Each person will pay, ", spiliValue)