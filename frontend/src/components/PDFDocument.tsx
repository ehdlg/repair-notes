import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import template from '../assets/template.png';
import { RepairNoteType } from '../types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 40,
  },
  view: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  template: {
    width: '80%',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '50vh',
    marginTop: '50px',
  },
  data: {
    width: '45%',
    padding: '20px',
    border: '2px solid black',
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '32px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    justifyContent: 'space-between',
    width: '80%',
    marginHorizontal: 'auto',
    gap: '10px',
  },
  label: {
    fontWeight: 'bold',
  },
  emptyColumn: {
    width: '45%',
    border: '2px solid black',
    minHeight: 200,
    padding: 20,
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  idContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '50px',
    fontWeight: 'bold',
    margin: '50px',
  },
  warning: {
    border: '2px solid black',
    padding: '24px',
    fontSize: '20px',
  },
  warningTitle: {
    fontSize: '30px',
  },
  value: {},
});

function PDFDocument({ note }: { note: Partial<RepairNoteType> }) {
  return (
    <Document>
      <Page size='A1' orientation='landscape' style={styles.page}>
        <View style={styles.view}>
          <Image src={template} style={styles.template} />
        </View>
        <View style={styles.idContainer}>
          <Text>Nota de reparación No.{note.id}</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.data}>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha de Entrada:</Text>
              <Text style={styles.value}>
                {new Date(note?.entryDate as Date).toLocaleDateString('es-ES')}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Cliente:</Text>
              <Text style={styles.value}>{note.client}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Número de Teléfono:</Text>
              <Text style={styles.value}>{note.phoneNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Máquina(s)/Modelo(s):</Text>
              <Text style={styles.value}>{note.model}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Avería:</Text>
              <Text style={styles.value}>{note.malfunction}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Reparación garantía:</Text>
              <Text style={styles.value}>{note.garanty ? 'Sí' : 'No'}</Text>
            </View>
            <View style={styles.warning}>
              <Text style={styles.warningTitle}>Nota de interés para el cliente</Text>
              <Text>
                * Para la recogida de la maquinaria es imprescindible la entrega de este resguardo
              </Text>
              <Text>
                * Los presupuestos de reparación que no sean aceptados se les sobrará el valor del
                tiempo aplicado a la elaboración de dicho presupuesto
              </Text>
              <Text>
                * Se prevee un plazo de 90 días desde la fecha de admisión de la máquina para ser
                retirada, de lo contrario se entenderá abandonada autorizando su desguace
              </Text>
            </View>
          </View>
          <View style={styles.emptyColumn}>
            <Text style={styles.label}>MATERIALES EMPLEADOS</Text>
            <Text>MANO DE OBRA ____________________ HORAS</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
