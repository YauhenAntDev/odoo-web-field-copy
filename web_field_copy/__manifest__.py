# License LGPL-3.0 (https://www.gnu.org/licenses/lgpl-3.0.html).
{
    'name': 'Web Field Copy Button',
    'version': '19.0.1.0.0',
    'category': 'Web',
    'summary': 'Add copy-to-clipboard buttons to Char and Text fields',
    'description': 'Copy readonly and live editable Char/Text values in Odoo 19, '
                   'with keyboard and touch access and password exclusion.',
    'author': 'Yauhen Antonau',
    "website": "https://github.com/YauhenAntDev/odoo-web-field-copy",
    "support": "yauhenantdeveloper@gmail.com",
    'license': 'LGPL-3',
    'depends': ['web'],
    "images": ["static/description/banner.png"],
    'assets': {
        'web.assets_backend': [
            'web_field_copy/static/src/js/field_copy.js',
            'web_field_copy/static/src/xml/field_copy.xml',
            'web_field_copy/static/src/scss/field_copy.scss',
        ],
        'web.assets_unit_tests': [
            'web_field_copy/static/tests/**/*.test.js',
        ],
    },
    'installable': True,
    'application': False,
}
