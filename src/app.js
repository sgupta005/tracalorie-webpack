import './css/style.css';
import './css/bootstrap.css';
import '@fortawesome/fontawesome-free/js/all';
import { Modal,Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import {Meal,Workout} from './Item';

class App{
    constructor(){
        this._tracker = new CalorieTracker();

        document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));
        document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));
        document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
        document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));
        document.getElementById('filter-meals').addEventListener('input', this._filterItems.bind(this, 'meal'));
        document.getElementById('filter-workouts').addEventListener('input', this._filterItems.bind(this, 'workout'));
        document.getElementById('reset').addEventListener('click', this._reset.bind(this));
        document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));

        this._tracker.loadMeals();
        this._tracker.loadWorkouts();
    }
    
    _setLimit(e){
        e.preventDefault();
        let limit  = document.getElementById('limit').value;
        if (limit === '' || 'abcdefghijklmnopqrstuvwxyz'.includes(limit)){
            alert('Please enter a valid value');
            return;
        }
        this._tracker.setLimit(+limit);
        limit = '';

        const modalEl = document.getElementById('limit-modal');
        const modal = Modal.getInstance(modalEl);
        modal.hide();
    }

    _reset(){
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _filterItems(type,e){
        const items = document.getElementById(`${type}-items`).children;
        Array.from(items).forEach(item => {
            if (item.textContent.toLowerCase().includes(e.target.value.toLowerCase())){
                item.style.display = 'flex';
            }else{
                item.style.display = 'none';
            }
        })
    }

    _removeItem(type,e){
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
            if (confirm('Are you sure?')){
                const id = e.target.closest('.card').getAttribute('data-id');
                if (type==='meal'){
                    this._tracker.removeMeal(id);
                }else{
                    this._tracker.removeWorkout(id);
                }
                e.target.closest('.card').remove();
            }
        }
    }

    _newItem(type,e){
        e.preventDefault();
        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);
        if (name.value === '' || calories.value === ''){
            alert('Please enter valid fields')
            return;
        }
        if (type === 'meal'){
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);
        }else{
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        }
        name.value = '';
        calories.value = '';

        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new Collapse(collapseItem, {
            toggle: true
        });
    }

}

const app = new App();