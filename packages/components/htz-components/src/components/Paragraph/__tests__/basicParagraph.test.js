import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Paragraph from '../Paragraph';

it('Simple Paragraph ', () => {
  const snapshot = felaSnapshotter(
    <Paragraph
      content={
        {
          attributes: [],
          tag: 'p',
          content: [
            {
              attributes: [
                {
                  key: 'text',
                  value: 'שלושה מחברי הכנסת של המפלגה, עזריה, פולקמן ובן-ארי, השתתפו במוצאי שבת האחרון בהפגנת הימין נגד השחיתות בכיכר ציון בירושלים. כחלון לא מנע מהם להשתתף בה, אך לפי פרסום של ספי עובדיה אמש בערוץ 10 - בישיבת הסיעה אתמול אמר כחלון לחכים: בסוף מתברר שמי שמזיק הכי הרבה למפלגה הם אנשי כולנו. אני מבקש דממת אלחוט. זה לא מוסיף לנו קולות. לא בטוח שתחזרו לכנסת אחרי הבחירות. כחלון הוסיף: אני מבקש שאף אחד לא ידבר בחוץ, לא פייסבוק ולא טוויטר. אנחנו לא מדברים על ההמלצות. חוק ההמלצות יעבור, אני לא מדבר על זה. אני מדבר על ההמלצות שיוגשו נגד ביבי - אני מבקש שלא לעסוק בזה!.',
                },
              ],
              tag: '#text',
            },
          ],
        }
      }
    />
  );
  expect(snapshot).toMatchSnapshot();
});
