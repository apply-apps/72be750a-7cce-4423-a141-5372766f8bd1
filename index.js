// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableOpacity } from 'react-native';

const ShoppingList = ({ items, onRemoveItem }) => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
        />
    );
};

const App = () => {
    const [item, setItem] = useState('');
    const [shoppingItems, setShoppingItems] = useState([]);

    const addItem = () => {
        if (item.trim()) {
            setShoppingItems([...shoppingItems, { id: Date.now().toString(), name: item }]);
            setItem('');
        }
    };

    const removeItem = (id) => {
        setShoppingItems(shoppingItems.filter(item => item.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Shopping List</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new item"
                    value={item}
                    onChangeText={setItem}
                />
                <Button title="Add" onPress={addItem} />
            </View>
            <ShoppingList items={shoppingItems} onRemoveItem={removeItem} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    list: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: 18,
    },
    removeButton: {
        backgroundColor: '#ff5c5c',
        padding: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default App;