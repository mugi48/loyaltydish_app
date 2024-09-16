import React, { useState, useEffect, forwardRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { CheckBox, RadioButton } from 'react-native-paper'; // Use react-native-paper for checkboxes and radio buttons
import CloseCircle from '../../assets/icons/close-circle.svg'; // Ensure this is compatible with React Native
import { containsObject, currencyToNumber, keyGenerator } from '../helpers/utils';

// Transition component not needed in React Native. Modal uses animation by default.

export default function AddItem(props) {
    const { open, handleClickOpen, handleClose } = props;
    const [product, setProduct] = useState({});
    const [extra, setExtra] = useState([]);
    const [optional, setOptional] = useState({});
    const [required, setRequired] = useState({});
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [subTotal2, setSubTotal2] = useState(0);
    const [extraInfo, setExtraInfo] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [key, setKey] = useState(null);
    const [newComponent, setNewComponent] = useState([]);
    const [deleteComponent, setDeleteComponent] = useState([]);
    const [oldRequired, setOldRequired] = useState({});
    const [oldOptional, setOldOptional] = useState({});
    const [guest, setGuest] = useState(0);

    useEffect(() => {
        if (props.product) {
            if (props.product.key) {
                const { optional, required, quantity, total, subTotal, subTotal2, extraInfo } = props.product;
                let componentsArray = props.product.productComponentsGroups.edges.map(edge => edge.node);
                componentsArray.sort((a, b) => a.isRequired - b.isRequired);
                setProduct(props.product);
                setKey(props.product.key);
                setExtra(componentsArray.reverse());
                setOptional(optional);
                setRequired(required);
                setOldRequired(required);
                setOldOptional(optional);
                setNewComponent(props.product.newComponent ? props.product.newComponent : []);
                setDeleteComponent(props.product.deleteComponent ? props.product.deleteComponent : []);
                setTotal(total);
                setSubTotal(subTotal);
                setQuantity(quantity);
                setSubTotal2(subTotal2);
                setExtraInfo(extraInfo);
            } else {
                let componentsArray = props.product.productComponentsGroups.edges.map(edge => edge.node);
                componentsArray.sort((a, b) => a.isRequired - b.isRequired);
                setProduct(props.product);
                setExtra(componentsArray.reverse());
                setTotal(currencyToNumber(props.product.price));
                setQuantity(1);
                setOptional({});
                setRequired({});
                setOldRequired({});
                setOldOptional({});
                setNewComponent([]);
                setDeleteComponent([]);
                setSubTotal(0);
                setSubTotal2(0);
                setKey(null);
            }
        }
    }, [props.product, open]);

    const onSelectOptional = (item, name) => {
        let dd = { ...optional };
        const oldDd = { ...oldOptional };
        const result = deleteComponent.filter(obj => obj.id !== item.id);
        setDeleteComponent(result);
        if (oldDd[name]) {
            if (oldDd[name].some(e => e.id === item.id)) {
                // vendors contains the element we're looking for
            } else {
                setNewComponent(prevState => [...prevState, item]);
            }
        } else {
            setNewComponent(prevState => [...prevState, item]);
        }
        if (dd[name]) {
            dd[name] = [...dd[name], item];
        } else {
            dd[name] = [item];
        }
        setOptional(prevState => ({ ...prevState, ...dd }));
        setSubTotal(subTotal + currencyToNumber(item.price));
    };

    const onRemoveOptional = (item, name) => {
        let dd = { ...optional };
        const oldDd = { ...oldOptional };
        if (oldDd[name]) {
            if (oldDd[name].some(e => e.id === item.id)) {
                // vendors contains the element we're looking for
                let result = oldDd[name].find(obj => obj.id === item.id);
                setDeleteComponent(prevState => [...prevState, result]);
            }
        }
        const result = dd[name].filter(({ id }) => !id.includes(item.id));
        dd[name] = result;
        setOptional(prevState => ({ ...prevState, ...dd }));
        setSubTotal(subTotal - currencyToNumber(item.price));
    };

    const selectRequired = (item, name) => {
        const dd = { ...required };
        const oldDd = { ...oldRequired };
        if (oldDd[name]?.id === item.id) {
            setDeleteComponent(prevState => [...prevState, oldDd[name]]);
        } else {
            setNewComponent(prevState => [...prevState, item]);
        }
        dd[name] = item;
        setRequired(prevState => ({ ...prevState, ...dd }));
        setSubTotal2(currencyToNumber(item.price));
    };

    const quantityModifier = (value) => {
        if (value) {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1);
        }
    };

    const addProductToCart = () => {
        let extraData = {
            quantity,
            optional,
            required,
            total,
            subTotal,
            subTotal2,
            extraInfo,
            guest,
            newComponent,
            deleteComponent,
            key: key ? key : keyGenerator()
        };
        props.addProducts({ ...product, ...extraData });
        handleClose();
    };

    const renderOptional = (item, index) => {
        const extra = item.components.edges.map(edge => edge.node);
        const { name } = item;
        return (
            <View style={styles.extraContainer} key={index}>
                <View style={styles.header}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.tag}>optional</Text>
                </View>
                {extra.map((item, idx) => renderOptionalItem(item, name, idx))}
            </View>
        );
    };

    const renderOptionalItem = (item, name, idx) => {
        const selected = optional[name] && containsObject(item, optional[name]);
        return (
            <TouchableOpacity
                key={idx}
                onPress={() => selected ? onRemoveOptional(item, name) : onSelectOptional(item, name)}
                style={styles.extraItemContainer}
            >
                <View style={styles.itemContent}>
                    <View style={styles.itemLeft}>
                        <CheckBox status={selected ? 'checked' : 'unchecked'} color='#0A0909' />
                        <Text style={styles.title}>{item.shortDescription}</Text>
                    </View>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderRequired = (item, index) => {
        const extra = item.components.edges.map(edge => edge.node);
        const { name } = item;
        return (
            <View style={styles.extraContainer} key={index}>
                <View style={styles.header}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.tag}>Required</Text>
                </View>
                {extra.map((item, idx) => renderRequiredItem(item, name, idx))}
            </View>
        );
    };

    const renderRequiredItem = (item, name, index) => {
        const dd = required;
        if (!dd[name]) {
            dd[name] = item;
            setRequired(prevState => ({ ...prevState, ...dd }));
            setSubTotal2(currencyToNumber(item.price));
        }
        const selected = required[name] ? required[name].id === item.id : false;
        return (
            <TouchableOpacity
                key={index}
                onPress={() => selectRequired(item, name)}
                style={styles.extraItemContainer}
            >
                <View style={styles.itemContent}>
                    <View style={styles.itemLeft}>
                        <RadioButton status={selected ? 'checked' : 'unchecked'} color='#0A0909' />
                        <Text style={styles.title}>{item.shortDescription}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderExtraData = (item, index) => {
        if (item.isRequired) {
            return renderRequired(item, index);
        } else {
            return renderOptional(item, index);
        }
    };

    return (
        <Modal
            visible={open}
            onRequestClose={handleClose}
            animationType="slide"
            transparent={false}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{product.name}</Text>
                        <Text style={styles.desc}>{product.shortDescription}</Text>
                    </View>
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <Image source={CloseCircle} style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {extra.map((item, index) => renderExtraData(item, index))}
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => quantityModifier(false)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={() => quantityModifier(true)} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={addProductToCart} style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 16,
        color: '#555',
    },
    closeButton: {
        padding: 10,
    },
    closeIcon: {
        width: 24,
        height: 24,
    },
    scrollContainer: {
        flex: 1,
    },
    extraContainer: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    tag: {
        fontSize: 14,
        color: '#999',
    },
    extraItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        color: '#000',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    quantityButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
    quantityButtonText: {
        fontSize: 20,
        color: '#000',
    },
    quantityText: {
        fontSize: 20,
        color: '#000',
    },
    footer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
