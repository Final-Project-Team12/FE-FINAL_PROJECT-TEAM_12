import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import LogoQuickFly from '../../../public/images/quickfly-vertical.png';
import iconPhone from '../../../public/icons/icon-telephone.png';
import iconMail from '../../../public/icons/icon-email.png';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0,
    position: 'relative',
    minHeight: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#7126B5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 'auto',
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  contentWrapper: {
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flightInfo: {
    flex: 2,
    marginRight: 40,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#7126B5',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    borderBottom: '2 solid #7126B5',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottom: '1 dotted #e0e0e0',
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#666666',
    width: 120,
    fontFamily: 'Helvetica-Bold',
  },
  value: {
    fontSize: 12,
    color: '#26355D',
    flex: 1,
    fontFamily: 'Helvetica',
  },
  qrSection: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 8,
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  qrText: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8F9FA',
    padding: 30,
    borderTopWidth: 2,
    borderTopColor: '#7126B5',
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  footerLogoImage: {
    width: 24,
    marginRight: 8,
  },
  footerCompanyName: {
    fontSize: 16,
    color: '#7126B5',
    fontFamily: 'Helvetica-Bold',
  },
  footerContact: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
  },
  footerRight: {
    flex: 2,
  },
  footerAddress: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'right',
  },
  importantNote: {
    fontSize: 8,
    color: '#999999',
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
  },
});

const TicketPDF = ({ ticket }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BOARDING PASS</Text>
          <Image style={styles.logo} src={LogoQuickFly} />
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.flightInfo}>
            <Text style={styles.sectionTitle}>Flight Information</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Flight Number</Text>
              <Text style={styles.value}>
                {ticket.ticket_details.flight_number || 'N/A'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Passenger Name</Text>
              <Text style={styles.value}>
                {ticket.ticket_details.passenger_name || 'N/A'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Airline</Text>
              <Text style={styles.value}>
                {ticket.ticket_details.airline || 'N/A'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Seat Number</Text>
              <Text style={styles.value}>
                {ticket.ticket_details.seat_number || 'N/A'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Departure Time</Text>
              <Text style={styles.value}>
                {ticket.ticket_details.departure_time
                  ? new Date(
                      ticket.ticket_details.departure_time
                    ).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={styles.qrSection}>
            {ticket.qrCode && (
              <>
                <Image style={styles.qrCode} src={ticket.qrCode} />
                <Text style={styles.qrText}>Scan for digital verification</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <View style={styles.footerLogo}>
                <Image style={styles.footerLogoImage} src={LogoQuickFly} />
                <Text style={styles.footerCompanyName}>QuickFly</Text>
              </View>
              <View style={styles.footerContacts}>
                <Text style={styles.footerContact}>
                  <Image src={iconPhone} style={{ width: 12, height: 12 }} />
                  {'   '}
                  0771132782
                </Text>
                <Text style={styles.footerContact}>
                  <Image src={iconMail} style={{ width: 12, height: 12 }} />
                  {'   '}
                  dummydata54@gmail.com
                </Text>
              </View>
            </View>

            <View style={styles.footerRight}>
              <Text style={styles.footerAddress}>
                Jl. Harapan Jaya No. 123 Kelurahan Kebayoran Baru,{'\n'}
                Kecamatan Kebayoran Jakarta Selatan,{'\n'}
                DKI Jakarta (12160)
              </Text>
            </View>
          </View>

          <Text style={styles.importantNote}>
            Please arrive at the airport at least 2 hours before departure time.
            This boarding pass must be presented along with valid
            identification.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default TicketPDF;
