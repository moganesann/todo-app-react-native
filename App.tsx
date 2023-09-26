import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

type TodoItem = {
  id: string,
  task: string,
  completed: boolean,
}

type Props = {
  items: TodoItem[],
  onAddItem: (task: string) => void,
  onToggleItem: (id: string) => void,
  onDeleteItem: (id: string) => void,
  onEditItem: (id: string, task: string) => void,
}

const TodoListItem = ({ item, onToggleItem, onDeleteItem, onEditItem }: { item: TodoItem } & Pick<Props, 'onToggleItem' | 'onDeleteItem' | 'onEditItem'>) => {
  const [editing, setEditing] = useState(false);
  const [task, setTask] = useState(item.task);

  const handleToggleItem = () => {
    onToggleItem(item.id);
  };

  const handleDeleteItem = () => {
    onDeleteItem(item.id);
  };

  const handleEditItem = () => {
    setEditing(true);
  };

  const handleSaveItem = () => {
    onEditItem(item.id, task);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setTask(item.task);
    setEditing(false);
  };

  return (
    <View style={styles.todoListItem}>
      <TouchableOpacity style={styles.checkbox} onPress={handleToggleItem}>
        <View style={[styles.checkboxIcon, item.completed && styles.checkboxIconChecked]} />
      </TouchableOpacity>
      {editing ? (
        <View style={styles.editTodo}>
          <TextInput style={styles.editTodoButtonText} value={task} onChangeText={setTask} autoFocus />
          <TouchableOpacity style={styles.editTodo} onPress={handleSaveItem}>
            <Text style={styles.editTodoButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editTodo} onPress={handleCancelEdit}>
            <Text style={styles.editTodoButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.todoItem}>
          <Text style={[styles.todoItemText, item.completed && styles.todoItemTextCompleted]}>{item.task}</Text>
          <TouchableOpacity style={styles.editTodo} onPress={handleEditItem}>
            <Text style={styles.editTodoButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteTodo} onPress={handleDeleteItem}>
            <Text style={styles.editTodoButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const TodoList = ({ items, onToggleItem, onDeleteItem, onEditItem }: Props) => {
  const renderItem = ({ item }: { item: TodoItem }) => (
    <TodoListItem item={item} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} onEditItem={onEditItem} />
  );

  return (
    <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} />
  );
};

const AddTodoForm = ({ onAddItem }: Pick<Props, 'onAddItem'>) => {
  const [task, setTask] = useState('');

  const handleAddItem = () => {
    if (task.trim().length > 0) {
      onAddItem(task);
      setTask('');
    }
  };

  return (
    <View style={styles.addTodo}>
    <TextInput style={styles.addTodoInput} value={task} onChangeText={setTask} placeholder="Add a task" />
    <TouchableOpacity style={styles.addTodoButton} onPress={handleAddItem}>
    <Text style={styles.addTodoButtonText}>Add</Text>
    </TouchableOpacity>
    </View>
    );
    };
    
    const TodoApp = () => {
    const [items, setItems] = useState<TodoItem[]>([]);
    
    const handleAddItem = (task: string) => {
    const newItem = { id: Date.now().toString(), task, completed: false };
    setItems([...items, newItem]);
    };
    
    const handleToggleItem = (id: string) => {
    const updatedItems = items.map(item => {
    if (item.id === id) {
    return { ...item, completed: !item.completed };
    }
    return item;
    });
    setItems(updatedItems);
    };
    
    const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    };
    
    const handleEditItem = (id: string, task: string) => {
    const updatedItems = items.map(item => {
    if (item.id === id) {
    return { ...item, task };
    }
    return item;
    });
    setItems(updatedItems);
    };
    
    return (
    <View style={styles.container}>
    <Text style={styles.title}>To-Do App</Text>
    <AddTodoForm onAddItem={handleAddItem} />
    <TodoList items={items} onToggleItem={handleToggleItem} onDeleteItem={handleDeleteItem} onEditItem={handleEditItem} onAddItem={handleAddItem}/>
    </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    },
    addTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    },
    addTodoInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    fontSize: 16,
    },
    addTodoButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    },
    addTodoButtonText: {
    color: '#fff',
    fontSize: 16,
    },
    todoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    },
    checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    },
    checkboxIcon: {
    width: 12,
    height: 12,
    borderRadius: 2,
    },
    checkboxIconChecked: {
    backgroundColor: '#4CAF50',
    },
    todoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    },
    todoItemText: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: 'none',
    },
    todoItemTextCompleted: {
    textDecorationLine: 'line-through',
    },
    editTodo: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: '#4CAF50',
    },
      editTodoButtonText: {
      color: '#fff',
      fontSize: 16,
    },
      deleteTodo: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: '#f44336',
      marginLeft: 8,
      },
      deleteTodoButtonText: {
      color: '#fff',
      fontSize: 16,
      },
      });

      export default TodoApp;
