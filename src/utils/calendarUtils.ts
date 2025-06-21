
export interface CalendarEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

export const addToCalendar = (event: CalendarEvent) => {
  // Créer un fichier ICS (iCalendar) compatible avec tous les calendriers
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//P49 ENA//Event//FR',
    'BEGIN:VEVENT',
    `DTSTART:${formatDate(event.startDate)}`,
    `DTEND:${formatDate(event.endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    `UID:${Date.now()}@p49ena.com`,
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Rappel: ' + event.title,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  // Créer et télécharger le fichier ICS
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const parseEventDate = (dateStr: string, timeStr: string) => {
  // Parser les dates françaises (ex: "15 Avril 2024")
  const months: { [key: string]: number } = {
    'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
    'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
  };

  const dateParts = dateStr.toLowerCase().split(' ');
  const day = parseInt(dateParts[0]);
  const month = months[dateParts[1]];
  const year = parseInt(dateParts[2]);

  // Parser l'heure (ex: "09:00 - 17:00")
  const startTime = timeStr.split(' - ')[0];
  const endTime = timeStr.split(' - ')[1];
  
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  const startDate = new Date(year, month, day, startHour, startMin);
  const endDate = new Date(year, month, day, endHour, endMin);

  return { startDate, endDate };
};
