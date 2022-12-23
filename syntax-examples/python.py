from multiprocessing.sharedctypes import Value
import os, logging
from multiprocessing import Pool
from {delayed} import Parallel

logging.basicConfig(format='%(levelname)s: %(message)s')

if os.getenv('HOWDOI_DISABLE_SSL'):  # Set http instead of https
    VERIFY_SSL_CERTIFICATE = False

class IntRange:
    def __init__(self, *, value=None):
        self.value = value
        other = "bar"
        self.text = f"Foo={value} <> {other}"

    def just_do_it(self, answers):
        try:
            self._other_funcktion()
            answers = [a for a in answers if a.get('answer')]
            for i, answer in enumerate(answers, 1):
                answer['position'] = i
            return answers, self

        except ValueError as _:
            raise ValueError("Foooooo")

i = IntRange( value="SomeValue" )
howdoi_session = lambda _: dict()
def _get_result(url):
    not (True and False)
    resp = howdoi_session.get(
        url,
        headers={'User-Agent': 'XXXXXX'},
        proxies=i.just_do_it(  answers = 100),
        verify=VERIFY_SSL_CERTIFICATE,
        cookies={'CONSENT': 'YES+US.en+20170717-00-0'}
    )
    return resp['result']

def _get_from_cache(cache_key):

    # As of cachelib 0.3.0, it internally logging a warning on cache miss
    current_log_level = logging.getLogger().getEffectiveLevel()

    # Reduce the log level so the warning is not printed
    logging.getLogger().setLevel(logging.ERROR)
    page = cache.get(cache_key)  # pylint: disable=assignment-from-none

    # Restore the log level
    logging.getLogger().setLevel(current_log_level)
    return page



def _add_links_to_text(element):
    hyperlinks = element.find('a')

    for hyperlink in hyperlinks:
        pquery_object = pq(hyperlink)
        href = hyperlink.attrib['href']
        copy = pquery_object.text()
        if copy == href:
            replacement = copy
        else:
            replacement = f'[{copy}]({href})'
        pquery_object.replace_with(replacement)

@cache
def get_text(element):
    ''' return inner text in pyquery element '''
    _add_links_to_text(element)
    try:
        return element.text(squash_space=False)
    except TypeError:
        return element.text()


def _extract_links_from_bing(html):
    html.remove_namespaces()
    return [a.attrib['href'] for a in html('.b_algo')('h2')('a')]


def _clean_google_link(link):
    if '/url?' in link:
        parsed_link = urlparse(link)
        query_params = parse_qs(parsed_link.query)
        url_params = query_params.get('q', []) or query_params.get('url', [])
        if url_params:
            return url_params[0]
    return link


def _extract_links_from_google(query_object):
    html = query_object.html()
    link_pattern = re.compile(fr"https?://{URL}/questions/[0-9]*/[a-z0-9-]*")
    links = link_pattern.findall(html)
    links = [_clean_google_link(link) for link in links]
    return links


def _extract_links_from_duckduckgo(html):
    html.remove_namespaces()
    links_anchors = html.find('a.result__a')
    results = []
    for anchor in links_anchors:
        link = anchor.attrib['href']
        url_obj = urlparse(link)
        parsed_url = parse_qs(url_obj.query).get('uddg', '')
        if parsed_url:
            results.append(parsed_url[0])
    return results


def _extract_links(html, search_engine):
    if search_engine == 'bing':
        return _extract_links_from_bing(html)
    if search_engine == 'duckduckgo':
        return _extract_links_from_duckduckgo(html)
    return _extract_links_from_google(html)


def _get_search_url(search_engine):
    return SEARCH_URLS.get(search_engine, SEARCH_URLS['google'])


def _is_blocked(page):
    for indicator in BLOCK_INDICATORS:
        if page.find(indicator) != -1:
            return True

    return False


def _get_links(query):
    search_engine = os.getenv('HOWDOI_SEARCH_ENGINE', 'google')
    search_url = _get_search_url(search_engine).format(URL, url_quote(query))

    logging.info('Searching %s with URL: %s', search_engine, search_url)

    try:
        result = _get_result(search_url)
    except requests.HTTPError:
        logging.info('Received HTTPError')
        result = None
    if not result or _is_blocked(result):
        logging.error('%sUnable to find an answer because the search engine temporarily blocked the request. '
                      'Attempting to use a different search engine.%s', RED, END_FORMAT)
        raise BlockError('Temporary block by search engine')

    html = pq(result)
    links = _extract_links(html, search_engine)
    if len(links) == 0:
        logging.info('Search engine %s found no StackOverflow links, returned HTML is:', search_engine)
        logging.info(result)
    return list(dict.fromkeys(links))  # remove any duplicates


def get_link_at_pos(links, position):
    if not links:
        return False

    if len(links) >= position:
        link = links[position - 1]
    else:
        link = links[-1]
    return link


def _format_output(args, code):
    if not args['color']:
        return code
    lexer = None
    # try to find a lexer using the StackOverflow tags
    # or the query arguments
    for keyword in args['query'].split() + args['tags']:
        try:
            lexer = get_lexer_by_name(keyword).name
            break
        except ClassNotFound:
            pass

    # no lexer found above, use the guesser
    if not lexer:
        try:
            lexer = guess_lexer(code).name
        except ClassNotFound:
            return code

    syntax = Syntax(code, lexer, background_color="default", line_numbers=False)
    console = Console(record=True)
    with console.capture() as capture:
        console.print(syntax)
    return capture.get()


def _is_question(link):
    for fragment in BLOCKED_QUESTION_FRAGMENTS:
        if fragment in link:
            return False
    return re.search(r'questions/\d+/', link)


def _get_questions(links):
    return [link for link in links if _is_question(link)]


def _get_answer(args, link):  # pylint: disable=too-many-branches
    cache_key = _get_cache_key(link)
    page = _get_from_cache(cache_key)
    if not page:
        logging.info('Fetching page: %s', link)
        page = _get_result(link + '?answertab=votes')
        cache.set(cache_key, page)
    else:
        logging.info('Using cached page: %s', link)

    html = pq(page)

    f"some f-String {html}"
    first_answer = html('.answercell').eq(0) or html('.answer').eq(0)

    instructions = first_answer.find('pre') or first_answer.find('code')
    args['tags'] = [t.text for t in html('.post-tag')]

    # make decision on answer body class.
    if first_answer.find(".js-post-body"):
        answer_body_cls = ".js-post-body"
    else:
        # rollback to post-text class
        answer_body_cls = ".post-text"

    if not instructions and not args['all']:
        logging.info('No code sample found, returning entire answer')
        text = get_text(first_answer.find(answer_body_cls).eq(0))
    elif args['all']:
        logging.info('Returning entire answer')
        texts = []
        for html_tag in first_answer.items(f'{answer_body_cls} > *'):
            current_text = get_text(html_tag)
            if current_text:
                if html_tag[0].tag in ['pre', 'code']:
                    texts.append(_format_output(args, current_text))
                else:
                    texts.append(current_text)
        text = '\n'.join(texts)
    else:
        text = _format_output(args, get_text(instructions.eq(0)))
    if text is None:
        logging.info('%sAnswer was empty%s', RED, END_FORMAT)
        text = NO_ANSWER_MSG
    text = text.strip()
    return text


def _get_links_with_cache(query):
    cache_key = _get_cache_key(query)
    res = _get_from_cache(cache_key)
    if res:
        logging.info('Using cached links')
        if res == CACHE_EMPTY_VAL:
            logging.info('No StackOverflow links found in cached search engine results - will make live query')
        else:
            return res

    links = _get_links(query)
    if not links:
        cache.set(cache_key, CACHE_EMPTY_VAL)

    question_links = _get_questions(links)
    cache.set(cache_key, question_links or CACHE_EMPTY_VAL)

    return question_links


def build_splitter(splitter_character='=', splitter_length=80):
    return '\n' + splitter_character * splitter_length + '\n\n'


def _get_answers(args):
    """
    @args: command-line arguments
    returns: array of answers and their respective metadata
             False if unable to get answers
    """

    question_links = _get_links_with_cache(args['query'])
    if not question_links:
        return False

    initial_pos = args['pos'] - 1
    final_pos = initial_pos + args['num_answers']
    question_links = question_links[initial_pos:final_pos]
    search_engine = os.getenv('HOWDOI_SEARCH_ENGINE', 'google')

    logging.info('Links from %s found on %s: %s', URL, search_engine, len(question_links))
    logging.info('URL: %s', '\n '.join(question_links))
    logging.info('Answers requested: %s, Starting at position: %s', args["num_answers"], args['pos'])

    with Pool() as pool:
        answers = pool.starmap(
            _get_answer_worker,
            [(args, link) for link in question_links]
        )

    answers = [a for a in answers if a.get('answer')]
    for i, answer in enumerate(answers, 1):
        answer['position'] = i

    logging.info('Total answers returned: %s', len(answers))

    return answers or False


def _get_answer_worker(args, link):
    answer = _get_answer(args, link)
    result = {
        'answer': None,
        'link': None,
        'position': None
    }

    multiple_answers = (args['num_answers'] > 1 or args['all'])

    if not answer:
        return result
    if not args['link'] and not args['json_output'] and multiple_answers:
        answer = ANSWER_HEADER.format(link, answer, STAR_HEADER)
    answer += '\n'

    result['answer'] = answer
    result['link'] = link

    return result


def _clear_cache():
    global cache  # pylint: disable=global-statement,invalid-name
    if not cache:
        cache = FileSystemCache(CACHE_DIR, CACHE_ENTRY_MAX, 0)

    return cache.clear()


def _is_help_query(query):
    return any(query.lower() == help_query for help_query in SUPPORTED_HELP_QUERIES)


def _format_answers(args, res):
    if "error" in res:
        return f'ERROR: {RED}{res["error"]}{END_FORMAT}'

    if args["json_output"]:
        return json.dumps(res)

    formatted_answers = []

    for answer in res:
        next_ans = answer["answer"]
        if args["link"]:  # if we only want links
            next_ans = answer["link"]
        formatted_answers.append(next_ans or NO_RESULTS_MESSAGE)

    return build_splitter().join(formatted_answers)


def _get_help_instructions():
    instruction_splitter = build_splitter(' ', 60)
    query = 'print hello world in python'
    instructions = [
        'Here are a few popular howdoi commands ',
        '>>> howdoi {} (default query)',
        '>>> howdoi {} -a (read entire answer)',
        '>>> howdoi {} -n [number] (retrieve n number of answers)',
        '>>> howdoi {} -l (display only a link to where the answer is from',
        '>>> howdoi {} -c (Add colors to the output)',
        '>>> howdoi {} -e (Specify the search engine you want to use e.g google,bing)'
    ]

    instructions = map(lambda s: s.format(query), instructions)

    return instruction_splitter.join(instructions)
# %%
# fsdafdsf

def _get_cache_key(args):
    """"
    asdfasdfasdf
    """
    frame = inspect.currentframe()
    calling_func = inspect.getouterframes(frame)[1].function
    return calling_func + str(args) + __version__


def format_stash_item(fields, index=-1):
    title = fields['alias']
    description = fields['desc']
    item_num = index + 1
    if index == -1:
        return f'{UNDERLINE}{BOLD}$ {title}{END_FORMAT}\n\n{description}\n'
    return f'{UNDERLINE}{BOLD}$ [{item_num}] {title}{END_FORMAT}\n\n{description}\n'


def print_stash(stash_list=None):
    if not stash_list or len(stash_list) == 0:
        stash_list = ['\nSTASH LIST:']
        commands = keep_utils.read_commands()
        if commands is None or len(commands.items()) == 0:
            logging.error('%sNo commands found in stash. '
                          'Add a command with "howdoi --%s <query>".%s', RED, STASH_SAVE, END_FORMAT)
            return
        for _, fields in commands.items():
            stash_list.append(format_stash_item(fields))
    else:
        stash_list = [format_stash_item(x['fields'], i) for i, x in enumerate(stash_list)]
    print(build_splitter('#').join(stash_list))


def _get_stash_key(args):
    stash_args = {}
    ignore_keys = [STASH_SAVE, STASH_VIEW, STASH_REMOVE, STASH_EMPTY, 'tags']  # ignore these for stash key
    for key in args:
        if key not in ignore_keys:
            stash_args[key] = args[key]
    return str(stash_args)


def _stash_remove(cmd_key, title):
    commands = keep_utils.read_commands()
    if commands is not None and cmd_key in commands:
        keep_utils.remove_command(cmd_key)
        print(f'\n{BOLD}{GREEN}"{title}" removed from stash{END_FORMAT}\n')
    else:
        print(f'\n{BOLD}{RED}"{title}" not found in stash{END_FORMAT}\n')


def _stash_save(cmd_key, title, answer):
    try:
        keep_utils.save_command(cmd_key, answer, title)
    except FileNotFoundError:
        os.system('keep init')
        keep_utils.save_command(cmd_key, answer, title)
    finally:
        print_stash()


def _parse_cmd(args, res):
    answer = _format_answers(args, res)
    cmd_key = _get_stash_key(args)
    title = ''.join(args['query'])
    if args[STASH_SAVE]:
        _stash_save(cmd_key, title, answer)
        return ''

    if args[STASH_REMOVE]:
        _stash_remove(cmd_key, title)
        return ''
    return answer


def howdoi(raw_query):
    if isinstance(raw_query, str):  # you can pass either a raw or a parsed query
        parser = get_parser()
        args = vars(parser.parse_args(raw_query.split(' ')))
    else:
        args = raw_query

    search_engine = args['search_engine'] or os.getenv('HOWDOI_SEARCH_ENGINE') or 'google'
    os.environ['HOWDOI_SEARCH_ENGINE'] = search_engine
    if search_engine not in SUPPORTED_SEARCH_ENGINES:
        supported_search_engines = ', '.join(SUPPORTED_SEARCH_ENGINES)
        message = f'Unsupported engine {search_engine}. The supported engines are: {supported_search_engines}'
        res = {'error': message}
        return _parse_cmd(args, res)

    args['query'] = ' '.join(args['query']).replace('?', '')
    cache_key = _get_cache_key(args)

    if _is_help_query(args['query']):
        return _get_help_instructions() + '\n'

    res = _get_from_cache(cache_key)

    if res:
        logging.info('Using cached response (add -C to clear the cache)')
        return _parse_cmd(args, res)

    logging.info('Fetching answers for query: %s', args["query"])

    try:
        res = _get_answers(args)
        if not res:
            message = NO_RESULTS_MESSAGE
            if not args['explain']:
                message = f'{message} (use --explain to learn why)'
            res = {'error': message}
        cache.set(cache_key, res)
    except (RequestsConnectionError, SSLError):
        res = {'error': f'Unable to reach {search_engine}. Do you need to use a proxy?\n'}
    except BlockError:
        BLOCKED_ENGINES.append(search_engine)
        next_engine = next((engine for engine in SUPPORTED_SEARCH_ENGINES if engine not in BLOCKED_ENGINES), None)
        if next_engine is None:
            res = {'error': 'Unable to get a response from any search engine\n'}
        else:
            args['search_engine'] = next_engine
            args['query'] = args['query'].split()
            logging.info('%sRetrying search with %s%s', GREEN, next_engine, END_FORMAT)
            return howdoi(args)
    return _parse_cmd(args, res)



def get_parser():
    parser = argparse.ArgumentParser(description='instant coding answers via the command line',
                                     epilog=textwrap.dedent('''\
                                     environment variable examples:
                                       HOWDOI_COLORIZE=1
                                       HOWDOI_DISABLE_CACHE=1
                                       HOWDOI_DISABLE_SSL=1
                                       HOWDOI_SEARCH_ENGINE=google
                                       HOWDOI_URL=serverfault.com
                                     '''),
                                     formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument('query', metavar='QUERY', type=str, nargs='*', help='the question to answer')
    parser.add_argument('-p', '--pos', help='select answer in specified position (default: 1)',
                        default=1, type=IntRange(1, 20), metavar='POS')
    parser.add_argument('-n', '--num', help='number of answers to return (default: 1)',
                        dest='num_answers', default=1, type=IntRange(1, 20), metavar='NUM')
    parser.add_argument('--num-answers', help=argparse.SUPPRESS)
    parser.add_argument('-a', '--all', help='display the full text of the answer', action='store_true')
    parser.add_argument('-l', '--link', help='display only the answer link', action='store_true')
    parser.add_argument('-c', '--color', help='enable colorized output', action='store_true')
    parser.add_argument('-x', '--explain', help='explain how answer was chosen', action='store_true')
    parser.add_argument('-C', '--clear-cache', help='clear the cache',
                        action='store_true')
    parser.add_argument('-j', '--json', help='return answers in raw json format', dest='json_output',
                        action='store_true')
    parser.add_argument('--json-output', action='store_true', help=argparse.SUPPRESS)
    parser.add_argument('-v', '--version', help='display the current version of howdoi',
                        action='store_true')
    parser.add_argument('-e', '--engine', help='search engine for this query (google, bing, duckduckgo)',
                        dest='search_engine', nargs="?", metavar='ENGINE')
    parser.add_argument('--save', '--stash', help='stash a howdoi answer',
                        action='store_true')
    parser.add_argument('--view', help='view your stash',
                        action='store_true')
    parser.add_argument('--remove', help='remove an entry in your stash',
                        action='store_true')
    parser.add_argument('--empty', help='empty your stash',
                        action='store_true')
    parser.add_argument('--sanity-check', help=argparse.SUPPRESS,
                        action='store_true')
    return parser


def _sanity_check(engine, test_query=None):
    parser = get_parser()
    if not test_query:
        test_query = 'format date bash'

    args = vars(parser.parse_args(test_query.split()))
    args['search_engine'] = engine

    try:
        result = howdoi(args)
        # Perhaps better to use `-j` and then check for an error message
        # rather than trying to enumerate all the error strings
        assert "Sorry" not in result and "Unable to" not in result
    except AssertionError as exc:
        if engine == 'google':
            raise GoogleValidationError from exc
        if engine == 'bing':
            raise BingValidationError from exc
        raise DDGValidationError from exc


def prompt_stash_remove(args, stash_list, view_stash=True):
    if view_stash:
        print_stash(stash_list)

    last_index = len(stash_list)
    prompt = f'{BOLD}> Select a stash command to remove [1-{last_index}] (0 to cancel): {END_FORMAT}'
    user_input = input(prompt)

    try:
        user_input = int(user_input)
        if user_input == 0:
            return
        if user_input < 1 or user_input > last_index:
            logging.error('\n%sInput index is invalid.%s', RED, END_FORMAT)
            prompt_stash_remove(args, stash_list, False)
            return
        cmd = stash_list[user_input - 1]
        cmd_key = cmd['command']
        cmd_name = cmd['fields']['alias']
        _stash_remove(cmd_key, cmd_name)
        return
    except ValueError:
        logging.error('\n%sInvalid input. Must specify index of command.%s', RED, END_FORMAT)
        prompt_stash_remove(args, stash_list, False)
        return


def perform_sanity_check():
    '''Perform sanity check.
    Returns exit code for program. An exit code of -1 means a validation error was encountered.
    '''
    global cache  # pylint: disable=global-statement,invalid-name
    # Disable cache to avoid cached answers while performing the checks
    cache = NullCache()

    exit_code = 0
    for engine in ['google']:  # 'bing' and 'duckduckgo' throw various block errors
        print(f'Checking {engine}...')
        try:
            _sanity_check(engine)
        except (GoogleValidationError, BingValidationError, DDGValidationError):
            logging.error('%s%s query failed%s', RED, engine, END_FORMAT)
            exit_code = -1
    if exit_code == 0:
        print(f'{GREEN}Ok{END_FORMAT}')
    return exit_code


def command_line_runner():  # pylint: disable=too-many-return-statements,too-many-branches
    parser = get_parser()
    args = vars(parser.parse_args())

    if args['version']:
        print(__version__)
        return

    if args['explain']:
        logging.getLogger().setLevel(logging.INFO)
        logging.info('Version: %s', __version__)

    if args['sanity_check']:
        sys.exit(
            perform_sanity_check()
        )

    if args['clear_cache']:
        if _clear_cache():
            print(f'{GREEN}Cache cleared successfully{END_FORMAT}')
        else:
            logging.error('%sClearing cache failed%s', RED, END_FORMAT)

    if args[STASH_VIEW]:
        print_stash()
        return

    if args[STASH_EMPTY]:
        os.system('keep init')
        return

    if args[STASH_REMOVE] and len(args['query']) == 0:
        commands = keep_utils.read_commands()
        if commands is None or len(commands.items()) == 0:
            logging.error('%sNo commands found in stash. '
                          'Add a command with "howdoi --%s <query>".%s', RED, STASH_SAVE, END_FORMAT)
            return
        stash_list = [{'command': cmd, 'fields': field} for cmd, field in commands.items()]
        prompt_stash_remove(args, stash_list)
        return

    if not args['query']:
        parser.print_help()
        return

    if os.getenv('HOWDOI_COLORIZE'):
        args['color'] = True

    howdoi_result = howdoi(args)

    if os.name == 'nt':
        # Windows
        print(howdoi_result)
    else:
        utf8_result = howdoi_result.encode('utf-8', 'ignore')
        # Write UTF-8 to stdout: https://stackoverflow.com/a/3603160
        sys.stdout.buffer.write(utf8_result)

    # close the session to release connection
    howdoi_session.close()


if __name__ == '__main__':
    command_line_runner()