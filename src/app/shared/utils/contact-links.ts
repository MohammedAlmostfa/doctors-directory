export const telHref = (phone: string) => 'tel:' + phone.replace(/\s/g, '');

export const mapHref = (query: string) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);

/** الرقم بالصيغة الدولية: 963999555014 */
export const whatsappHref = (intlNumber: string) => 'https://wa.me/' + intlNumber.replace(/\D/g, '');
