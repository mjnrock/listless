import React from "react";
import { StyleSheet, Text, View } from "react-native";
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

        // setInterval(() => this.forceUpdate(), 500);

        // t1.StartTime();
        // setTimeout(() => {
        //     t1.StopTime();
        //     t1.StartTime();

        //     setTimeout(() => {
        //         t1.StopTime();
        //         t1.StartTime();
                
        //         setTimeout(() => {
        //             t1.StopTime();
        //             t1.StartTime();

        //             t1.BeginLoop();
        //         }, 2000);
        //     }, 1250);
        // }, 750);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.task }>
                    { Lux.Core.Helper.StringifyCyclic(this.context.$(), 2) }
                </Text>
                <Text style={ styles.task }>
                    { this.context.$().GetTotalTime(true) }
                </Text>
                <Text style={ styles.task }>
                    { (this.context.$("GetTotalTime") / 1000).toString().toHHMMSS() }
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
