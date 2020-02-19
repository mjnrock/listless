import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Lux from "@lespantsfancy/lux";

import Core from "./core/package";

const t1 = new Core.Task("Hello, this is a task");
Lux.React.Context.Observer.setSubject(t1);


// String.prototype.toHHMMSS = function () {
//     var sec_num = parseInt(this, 10); // don't forget the second param
//     var hours   = Math.floor(sec_num / 3600);
//     var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
//     var seconds = sec_num - (hours * 3600) - (minutes * 60);

//     if (hours   < 10) {hours   = "0"+hours;}
//     if (minutes < 10) {minutes = "0"+minutes;}
//     if (seconds < 10) {seconds = "0"+seconds;}
//     return hours+':'+minutes+':'+seconds;
// }

export default class App extends Lux.React.ObserverComponent {
    componentDidMount() {
        super.componentDidMount();

        console.log({
            Context: this.context.UUID(),
            Subject: this.context.$().UUID(),
        });
        console.log(this.context);

        // setInterval(() => this.forceUpdate(), 500);

        t1.StartTime();
        setTimeout(() => {
            t1.StopTime();
            t1.StartTime();

            setTimeout(() => {
                t1.StopTime();
                t1.StartTime();
                
                setTimeout(() => {
                    t1.StopTime();
                    t1.StartTime();

                    t1.BeginLoop();
                    console.log(this.context.$().Timer.Sprints);
                }, 350);
            }, 300);
        }, 250);
    }

    render() {
        // const sprints = this.context.$().Timer.Sprints.reduce((a, v, i) => {
        //     a.push({ [ i ]: v });

        //     return a;
        // }, []);

        return (
            <View style={ styles.container }>
                <View style={ styles.container }>
                    <FlatList
                        data={ Lux.Core.Helper.A2OA(this.context.$().Timer.Sprints, "value") }
                        renderItem={ ({ item }) => {
                            return <Text>{ item.value }</Text>;
                        }}
                    />
                </View>

                <Text style={ styles.task }>
                    { this.context.$().GetTotalTime(true) }
                </Text>
                <Text style={ styles.task }>
                    { (this.context.$("GetTotalTime") / 1000) }
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    task: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 4,
        padding: 4,
        margin: 4
    }
});
