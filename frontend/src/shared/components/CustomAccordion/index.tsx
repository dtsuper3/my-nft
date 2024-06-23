import React from 'react'
import { Accordion } from '@mantine/core'
import styles from "./CustomAccordion.module.css";

interface ICustomAccordion {
    label: string;
    value: React.ReactNode;
}
function CustomAccordion({ label, value }: ICustomAccordion) {
    return (
        <Accordion defaultValue={label} mt={"md"}>
            <Accordion.Item value={label} className={styles["acc-item"]}>
                <Accordion.Control className={styles["acc-item-control"]} bg={"blue"}>{label}</Accordion.Control>
                <Accordion.Panel>
                    {value}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    )
}

export default CustomAccordion