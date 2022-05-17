import React, { useState, useMemo, useEffect } from 'react';

import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';

/*
 **Example data:
 */
import countries from './countries.json';

export default function App() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(undefined);
    const [query, setQuery] = useState('');

    useEffect(() => {
        setData(countries);
    }, []);

    /*
     **Example filter function
     * @param {string} filter
     */
    const filteredData = useMemo(() => {
        if (data && data.length > 0) {
            return data.filter((item) =>
                item.name
                    .toLocaleLowerCase('en')
                    .includes(query.toLocaleLowerCase('en'))
            );
        }
    }, [data, query]);

    /*
     **Input search
     *@param {string} text
     */
    const onSearch = (text) => {
        setQuery(text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onOpen('praxis');
                }}
            >
                <Text style={styles.text}>Praxis auswählen</Text>
            </TouchableOpacity>
            <Text style={{ padding: 10 }}>Aktuelle Praxis: {JSON.stringify(selected)}</Text>
            <Picker
                id="praxis"
                data={filteredData}
                inputValue={query}
                searchable={true}
                label="Wähle deine Praxis!"
                setSelected={setSelected}
                onSearch={onSearch}
            />


            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onOpen('country');
                }}
            >
                <Text style={styles.text}>Behandler auswählen</Text>
            </TouchableOpacity>
            <Text style={{ padding: 10 }}>Aktueller Behandler: {JSON.stringify(selected)}</Text>
            <Picker
                id="country"
                data={filteredData}
                inputValue={query}
                searchable={true}
                label="Wähle deinen Behandler!"
                setSelected={setSelected}
                onSearch={onSearch}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0ebbff',
        padding: 10,
        borderRadius: 6,
        marginTop: 50,
    },
    text: {
        color: '#ffffff',
    },
});