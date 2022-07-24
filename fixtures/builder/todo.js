import { faker } from '@faker-js/faker';

const getNewTodo = function (title, description, doneStatus) {
  this.title = title;
  this.description = description;
  this.doneStatus = doneStatus;
};

const TodoBuilder = function () {
  return {
    setName() {
      this.title = faker.internet.domainName();
      return this;
    },
    setDescription() {
      this.description = faker.lorem.text();
      return this;
    },
    setDoneStatus(doneStatus) {
      this.doneStatus = doneStatus;
      return this;
    },

    build() {
      return new getNewTodo(this.title, this.description, this.doneStatus);
    },
  };
};

export default TodoBuilder;
