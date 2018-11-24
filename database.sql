CREATE TABLE 'todo' (
    'id' SERIAL PRIMARY KEY,
    'task' VARCHAR(200),
    'priority' FLOAT,
    'completed' BOOLEAN
);

INSERT INTO todo (task, completed, priority)
VALUES('Clean the house', false, 3),
('Buy groceries', false, 1),
('Walk the dog', false, 2),
('Finish Project', false, 1),
('Work out', false, 1);