//This is my basic menu app that contains two classes and an array 

class Student {
    constructor(name,grade){
        this.name = name;
        this.grade = grade;
    }
    describe(){
        return `${this.name} is in ${this.grade} grade.`;
    }
}

class Classroom {
    constructor(name){
        this.name = name;
        this.students = [];
    }
    addStudent(student){
        if(student instanceof Student){
            this.students.push(student);
        } else {
            throw new Error(`You can only add an instance of a student name.`);
        }
    }
    describe(){
        return `${this.name} has ${this.students.length} students in class.`;
    }
}

class Menu{
    constructor(){
        this.classes = [];
        this.selectedClass = null;
    }
    start(){
        let selection = this.mainMenu();
        while(selection != 0){
            switch(selection){
                case `1`: 
                    this.createClass();
                    break;
                case `2`:
                    this.viewClass();
                    break;
                case `3`:
                    this.deleteClass();
                    break;
                case `4`:
                    this.displayClasses();
                    break
                default:
                    selection = 0;
            }
            selection = this.mainMenu();
        }
        alert(`Goodbye!`);
    }
    mainMenu(){
        return prompt(`
        0) Exit
        1) Create a class
        2) View a class
        3) Delete a class
        4) View all classes
        `);
    }
    createClass(){
        let name = prompt(`Enter the name for a new class: `);
        this.classes.push(new Classroom(name));
    }
    viewClass(){
        let index = prompt(`Enter the index of the team you wish to view: `);
        if(index >-1 && index < this.classes.length){
            this.selectedClass = this.classes[index];
            let description = `Class Name: ` + this.selectedClass.name + `\n`;
            
            for(let i = 0; i < this.selectedClass.students.length; i++){
                description += i + `)` + this.selectedClass.students[i].name + ` - ` 
                + this.selectedClass.students[i].grade + `\n`;
            }
            let selection = this.classOptions(description);
            switch(selection){
                case `1`:
                    this.createStudent();
                    break;
                case `2`:
                    this.deleteStudent();
            }
        }
    }
    classOptions(classInfo){
        return prompt(`
        0) Back
        1) Create Student
        2) Delete Student
        ------------------
        ${classInfo}
        `);
    }
    createStudent(){
        let name = prompt(`Enter the new name for student: `);
        let grade = prompt(`Enter the grade for the student: `);
        this.selectedClass.students.push(new Student(name,grade));
    }
    deleteStudent(){
        let index = prompt(`Enter the index of the student you wish to delete: `);
        if(index > -1 && index < this.selectedClass.students.length){
            this.selectedClass.students.splice(index,1);
        }
    }
    deleteClass(){
        let del = prompt(`Enter the index of the class you want to delete: `);
        if(del >-1 && del <this.classes.length) {
            this.classes.splice(del,1);
        }
    }
    displayClassses(){
        let classString = ``;
        for(let i = 0; i < this.classes.length; i++){
            classString += i + `)` + this.classes[i].name + `\n`;
        }
        alert(classString);
    }
}

let runMain = new Menu;
runMain.start();

