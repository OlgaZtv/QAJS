import Chanllenger from "./challenger.service";
import Chanllenges from "./challenges.service";
import Todo from "./todos.service";

const api = () => ({
    Chanllenger: () => ({...Chanllenger}),
    Chanllenges: () => ({...Chanllenges}),
    Todo: () => ({...Todo}),
});

export {api};