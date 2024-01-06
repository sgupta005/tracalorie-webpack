
class Storage{
    static getCalorieLimit(defaultLimit=2000){
        let calorieLimit;
        if (localStorage.getItem('calorieLimit')===null){
            calorieLimit = defaultLimit;
        }else{
            calorieLimit = +localStorage.getItem('calorieLimit');
        }
        return calorieLimit;
    }

    static setCalorieLimit(limit){
        localStorage.setItem('calorieLimit', limit);
    }

    static getTotalCalories(defaultValue=0){
        let totalCalories;
        if (localStorage.getItem('totalCalories')===null){
            totalCalories = defaultValue;
        }else{
            totalCalories = +localStorage.getItem('totalCalories');
        }
        return totalCalories;
    }

    static setTotalCalories(totalCalories){
        localStorage.setItem('totalCalories', totalCalories);
    }

    static getMeals(){
        let meals;
        if (localStorage.getItem('meals')===null){
            meals = [];
        }else{
            meals = JSON.parse(localStorage.getItem('meals'));
        }
        return meals;
    }

    static setMeal(meal){
        let meals = Storage.getMeals();
        meals.push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
    }

    static removeMeal(id){
        let meals = Storage.getMeals();
        meals = meals.filter(meal=>meal.id!=id);
        localStorage.setItem('meals',JSON.stringify(meals));
    }

    static getWorkouts(){
        let workouts;
        if (localStorage.getItem('workouts')===null){
            workouts = [];
        }else{
            workouts = JSON.parse(localStorage.getItem('workouts'));
        }
        return workouts;
    }

    static setWorkout(workout){
        let workouts = Storage.getWorkouts();
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    static removeWorkout(id){
        let workouts = Storage.getWorkouts();
        workouts = workouts.filter(workout=>workout.id!=id);
        console.log(workouts);
        localStorage.setItem('workouts',JSON.stringify(workouts));
    }

    static clearAll(){
        localStorage.removeItem('totalCalories');
        localStorage.removeItem('meals');
        localStorage.removeItem('workouts');
    }
}

export default Storage;